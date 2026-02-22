class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.gradientTop = json.world?.gradientTop ?? [200, 220, 255];
    this.gradientBottom = json.world?.gradientBottom ?? [255, 200, 230];
    this.clouds = json.clouds ?? [];
    this.gridStep = json.world?.gridStep ?? 160;

    this.obstacles = json.obstacles ?? [];

    // NEW: camera tuning knob from JSON (data-driven)
    this.camLerp = json.camera?.lerp ?? 0.12;
  }

  drawBackground() {
    background(255);
  }

  drawWorld() {
    noStroke();
    noFill();

    //Gradients for background as players move
    for (let y = 0; y <= this.h; y += 0.7) {
      //colour of background gradient reacts to movements (subtle)
      let offset = sin(frameCount * 0.01) * 0.05;
      let t = map(y, 0, this.h, 0, 1) + offset;

      let r = lerp(this.gradientTop[0], this.gradientBottom[0], t);
      let g = lerp(this.gradientTop[1], this.gradientBottom[1], t);
      let b = lerp(this.gradientTop[2], this.gradientBottom[2], t);

      stroke(r, g, b);
      line(0, y, this.w, y);
    }

    // stroke(245);
    // for (let x = 0; x <= this.w; x += this.gridStep) line(x, 0, x, this.h);
    // for (let y = 0; y <= this.h; y += this.gridStep) line(0, y, this.w, y);

    noStroke();
    fill(170, 190, 210);
    for (const o of this.obstacles) rect(o.x, o.y, o.w, o.h, o.r ?? 0);

    //Draws clouds in the background
    for (const c of this.clouds) {
      let float = sin(frameCount * 0.02 + c.x) * 10;

      fill(255, 255, 255, 255);
      ellipse(c.x, c.y + float, c.size);
      ellipse(c.x - 50, c.y + float, c.size * 0.8);
      ellipse(c.x + 70, c.y + float, c.size * 0.8);
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(20);
    text("In a DreamySky", 12, 20);
    text(
      "camLerp(JSON): " +
        this.camLerp +
        "  Player: " +
        (player.x | 0) +
        "," +
        (player.y | 0) +
        "  Cam: " +
        (camX | 0) +
        "," +
        (camY | 0),
      12,
      40,
    );
  }
}

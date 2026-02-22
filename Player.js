class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 3;
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    const len = max(1, abs(dx) + abs(dy));
    this.x += (dx / len) * this.s;
    this.y += (dy / len) * this.s;
  }

  draw() {
    push();
    translate(this.x, this.y);

    // gentle floating bob
    let bob = sin(frameCount * 0.1) * 2;
    translate(0, bob);

    noStroke();

    // wing flap animation
    let flap = sin(frameCount * 0.3) * 8;

    fill(255, 230, 200);
    ellipse(-12, flap * 0.5, 14, 8);

    // body
    fill(255, 240, 220);
    ellipse(0, 0, 28, 24);

    //puts a wing behind
    ellipse(12, flap * 0.5, 14, 8);

    // small eye
    fill(50);
    ellipse(4, -2, 2);

    pop();
  }
}

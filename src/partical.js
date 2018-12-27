import P5 from 'p5';

export class Builder {
  constructor(sketch) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in sketch) {
      this[key] = sketch[key];
    }
  }
}

export default class Partical extends Builder {
  constructor(sketch, startX, startY) {
    super(sketch);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.finished = this.finished.bind(this);
    this.intersects = this.intersects.bind(this);
    this.pos = this.createVector(startX, startY);
    this.radius = 2;
    this.mag = this.random(20);
  }

  update() {
    this.pos.x -= this.radius;
    this.pos.y += this.random(-this.mag, this.mag);

    let angle = this.pos.heading();
    angle = this.constrain(angle, 0, this.PI / 6);
    const magnitude = this.pos.mag();
    this.pos = P5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);
  }

  show() {
    this.stroke(255);
    this.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }

  finished() {
    return this.pos.x < 1;
  }

  intersects(items) {
    return !items.every(
      item => this.dist(this.pos.x, this.pos.y, item.pos.x, item.pos.y)
        > this.radius * 2,
    );
  }
}

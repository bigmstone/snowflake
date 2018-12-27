/* eslint-env browser */
import P5 from 'p5';
import Partical from './partical';

class Canvas extends P5 {
  constructor() {
    super();
    this.setup = this.setup.bind(this);
    this.draw = this.draw.bind(this);

    this.snowflake = [];
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }

  setup() {
    this.createCanvas(this.canvasWidth, this.canvasHeight);
    this.current = new Partical(this, this.canvasWidth / 2, this.random(10));
  }

  draw() {
    this.background(0);
    this.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    this.rotate(this.PI / 6);

    while (
      !this.current.finished()
      && !this.current.intersects(this.snowflake)
    ) {
      this.current.update();
    }

    if (this.current.finished() || this.current.intersects(this.snowflake)) {
      this.snowflake.push(this.current);
      this.current = new Partical(this, this.canvasWidth / 2, this.random(10));
    }

    [...Array(6)].forEach(() => {
      this.rotate(this.PI / 3);
      this.current.show();
      this.snowflake.forEach(particle => particle.show());

      this.push();
      this.scale(1, -1);
      this.current.show();
      this.snowflake.forEach(particle => particle.show());
      this.pop();
    });
  }
}

const main = () => new Canvas();

main();

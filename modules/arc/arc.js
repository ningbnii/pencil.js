import Component from "@pencil.js/component";
import Vector from "@pencil.js/vector";
import Position from "@pencil.js/position";

const pi2 = Math.PI * 2;

/**
 * Arc class
 * @class
 * @extends Component
 */
export default class Arc extends Component {
    /**
     * Arc constructor
     * @param {Position} position - Center of arc
     * @param {Number} radius - Distance from center to outer edge
     * @param {Number} [startAngle=0] - Angle to start from (0 is top, 0.5 is bottom and 1 is full circle back to top)
     * @param {Number} [endAngle=1] - Angle to end to
     * @param {ComponentOptions} [options] - Drawing options
     */
    constructor (position, radius, startAngle = 0, endAngle = 1, options) {
        super(position, options);
        this.radius = Math.floor(radius);
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    /**
     * Draw the arc
     * @param {CanvasRenderingContext2D} ctx - Drawing context
     * @return {Arc} Itself
     */
    trace (ctx) {
        ctx.arc(0, 0, this.radius, this.startAngle * pi2, this.endAngle * pi2);
        return this;
    }

    /**
     * Define if position in over this
     * @param {Position} position - Any position
     * @return {Boolean}
     */
    isHover (position) {
        const top = new Position(0, this.radius);
        const flatPart = new Vector(top.rotate(this.startAngle), top.rotate(this.endAngle));
        return super.isHover(position) &&
            this.position.distance(position) < this.radius && this.position.isOnSameSide(position, flatPart);
    }
}
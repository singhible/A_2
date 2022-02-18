let length = document.querySelector('#length');
let breadth = document.querySelector('#breadth');
let name = document.querySelector('#name');
let x_OFF = document.querySelector('#x_off');
let y_OFF = document.querySelector('#y_off');
let line_breadth = document.querySelector('#line_breadth');

//buttons and forms
let submit = document.querySelector('#subm');
let c = document.querySelector('#myCanvas');
let create_btn = document.querySelector('#create_rec');

//methods
context = document.getElementById("myCanvas").getContext("2d");
function Rectangle(params) {
    this.Name = params.Name || "Default";
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.width = params.width || 0;
    this.height = params.height || 0;
    this.fillStyle = params.fillStyle || "#FFFFFF";
    this.lineWidth = params.lineWidth || 0;
}
Rectangle.prototype.draw = function () {
    if (this.fillStyle) {
        context.fillStyle = this.fillStyle;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    if (this.strokeStyle && this.lineWidth) {
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

//event listeners
create_btn.addEventListener('click', () => {
    console.log("Create button works");
    var rectangles = [new Rectangle({Name: name.value, x: x_OFF.value, y: y_OFF.value, width: breadth.value, height: length.value, lineWidth: line_breadth.value})];
    for (let i = 0; i < rectangles.length; ++i) {
        rectangles[i].draw();
    }
});

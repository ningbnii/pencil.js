import test from "ava";
import Button from "./button";

test.beforeEach((t) => {
    t.context = new Button([100, 100], {
        value: "button text",
    });
});

test("constructor", (t) => {
    t.not(t.context.text, undefined);
    ["fill", "font", "fontSize", "bold", "italic"].forEach((prop) => {
        t.is(t.context.text.options[prop], t.context.options[prop]);
    });
});

test("get and set value", (t) => {
    t.is(t.context.value, t.context.text.text);

    t.context.value = "test";
    t.is(t.context.text.text, "test");
});

test("defaultOptions", (t) => {
    const options = Button.defaultOptions;
    t.is(options.value, "");
    ["font", "fontSize", "bold", "italic"].forEach((prop) => {
        t.is(options[prop], t.context.text.constructor.defaultOptions[prop]);
    });
});

test("MARGIN", (t) => {
    t.is(Button.MARGIN, 0.2);
});

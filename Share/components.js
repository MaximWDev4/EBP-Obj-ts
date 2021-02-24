"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomModalWindow = exports.ModalActivityIndicator = exports.MyButton = exports.TextStroke = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var TextStroke = /** @class */ (function (_super) {
    __extends(TextStroke, _super);
    function TextStroke() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createClones = function (w, h, color) {
            var children = _this.props.children;
            return react_1.Children.map(children, function (child) {
                if (react_1.isValidElement(child)) {
                    var currentProps = child.props;
                    var currentStyle = currentProps ? (currentProps.style || {}) : {};
                    var newProps = __assign(__assign({}, currentProps), { style: __assign(__assign({}, currentStyle), { textShadowOffset: {
                                width: w,
                                height: h
                            }, textShadowColor: color, textShadowRadius: 1 }) });
                    return react_1.cloneElement(child, newProps);
                }
                return child;
            });
        };
        return _this;
    }
    TextStroke.prototype.render = function () {
        var _a = this.props, color = _a.color, stroke = _a.stroke, children = _a.children;
        var strokeW = stroke;
        var top = this.createClones(0, -strokeW * 1.2, color);
        var topLeft = this.createClones(-strokeW, -strokeW, color);
        var topRight = this.createClones(strokeW, -strokeW, color);
        var right = this.createClones(strokeW, 0, color);
        var bottom = this.createClones(0, strokeW, color);
        var bottomLeft = this.createClones(-strokeW, strokeW, color);
        var bottomRight = this.createClones(strokeW, strokeW, color);
        var left = this.createClones(-strokeW * 1.2, 0, color);
        return (<react_native_1.View>
                <react_native_1.View style={styles.outline}>{left}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{right}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{bottom}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{top}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{topLeft}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{topRight}</react_native_1.View>
                <react_native_1.View style={styles.outline}>{bottomLeft}</react_native_1.View>
                {bottomRight}
            </react_native_1.View>);
    };
    return TextStroke;
}(react_1.default.Component));
exports.TextStroke = TextStroke;
exports.MyButton = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Отмена" : _b, _c = _a.onPress, onPress = _c === void 0 ? function () { } : _c, _d = _a.style, style = _d === void 0 ? {
        height: 'auto',
        size: 1,
        backgroundColor: '#8C8888',
        color: '#0cc213',
        fontSize: 18,
    } : _d;
    return (<react_native_1.TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[
        styles.appButtonContainer,
        { maxHeight: style.height,
            marginVertical: 10,
            flex: style.size,
            justifyContent: 'center',
            alignItems: 'center',
        },
        !!style.backgroundColor && {
            backgroundColor: style.backgroundColor
        }
    ]}>

            <react_native_1.Text style={{
        height: 'auto',
        fontSize: style.fontSize,
        color: style.color,
        alignSelf: "center",
        textAlign: 'center',
        justifyContent: 'center',
        textTransform: "uppercase"
    }}>{title}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
exports.ModalActivityIndicator = function (props) {
    var _a = props.show, show = _a === void 0 ? false : _a, _b = props.color, color = _b === void 0 ? "black" : _b, _c = props.cancelable, cancelable = _c === void 0 ? false : _c, _d = props.backgroundColor, backgroundColor = _d === void 0 ? "white" : _d, _e = props.dimLights, dimLights = _e === void 0 ? 0.6 : _e, _f = props.loadingMessage, loadingMessage = _f === void 0 ? "Загрузка..." : _f, _g = props.buttonTitle, buttonTitle = _g === void 0 ? "Отмена" : _g, _h = props.buttonAction, buttonAction = _h === void 0 ? function () { } : _h;
    return (<react_native_1.Modal transparent={true} animationType="none" visible={show}>
            <react_native_1.View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0," + dimLights + ")"
    }}>
                <react_native_1.View style={{
        padding: 10,
        backgroundColor: "" + backgroundColor,
        borderRadius: 13
    }}>
                    <react_native_1.ActivityIndicator animating={show} color={color} size="large"/>
                    <react_native_1.Text style={{ color: "" + color }}>{loadingMessage}</react_native_1.Text>
                    {cancelable && <react_native_1.Button onPress={buttonAction()} title={buttonTitle}/>}
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.Modal>);
};
exports.CustomModalWindow = function (props) {
    var _a = props.show, show = _a === void 0 ? false : _a, _b = props.color, color = _b === void 0 ? "black" : _b, _c = props.backgroundColor, backgroundColor = _c === void 0 ? "#FFFFFF" : _c, _d = props.dimLights, dimLights = _d === void 0 ? 0.6 : _d, _e = props.message, message = _e === void 0 ? "Вы уверены?" : _e, _f = props.buttons, buttons = _f === void 0 ? [
        { title: "Отмена", onPress: function () { }, style: { backgroundColor: '#8C8888', color: '#b22000', fontSize: 18, size: 2 } },
        { title: "Подтвердить", onPress: function () { }, style: { backgroundColor: '#8C8888', color: '#0cc213', fontSize: 18, size: 2 } }
    ] : _f;
    var btns = [];
    buttons.map(function (button, i) {
        btns.push(<exports.MyButton key={i} title={button.title} onPress={button.onPress} style={button.style}/>);
    });
    return (<react_native_1.Modal transparent={true} animationType="none" visible={show}>
            <react_native_1.View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        backgroundColor: "rgba(0,0,0," + dimLights + ")"
    }}>
                <react_native_1.View style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        height: '30%',
        backgroundColor: "" + backgroundColor,
        borderRadius: 13,
        paddingVertical: 30,
    }}>
                    <react_native_1.Text style={{ color: "" + color, paddingHorizontal: 40, paddingBottom: 20, fontSize: 15 }}>{message}</react_native_1.Text>
                    <react_native_1.View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, flex: 1 }}>{btns}</react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.Modal>);
};
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        // borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    text: {},
    outline: {
        position: 'absolute'
    },
});

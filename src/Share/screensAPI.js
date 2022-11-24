"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderGPSView = exports.RenderPhotoView = exports.IM = exports.pickImage = exports.al = void 0;
var react_1 = require("react");
var ImagePicker = require("expo-image-picker");
var react_native_1 = require("react-native");
var components_1 = require("./components");
var colors = {
    green: "#0cc213",
    yellow: "#c29f0c",
    red: "#b22000",
    gray: "#8C8888",
    transparent: 'transparent'
};
/** accuracyLvl */
exports.al = {
    high: 2,
    mid: 3.5,
    low: 4.5,
};
var pickImage = function (type, hasPermision, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!hasPermision) return [3 /*break*/, 5];
                result = void 0;
                if (!(type == 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, ImagePicker.launchCameraAsync({
                        base64: true,
                        quality: 1
                    })];
            case 1:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    quality: 1
                })];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                if (!result.cancelled) {
                    callback(true, result.uri);
                }
                else {
                    callback(false, '');
                }
                return [3 /*break*/, 6];
            case 5:
                Promise.reject("No permission").catch(function (e) { return callback(false, e); });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.pickImage = pickImage;
function IM(image, callback) {
    return (<react_native_1.View style={{
        marginTop: 10,
        flexDirection: 'row',
        //flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    }}>

    <react_native_1.View style={{
        flex: 3
    }}>

    <react_native_1.Image source={{ uri: image }} style={{ width: 100, height: 100 }}/>
    </react_native_1.View>

    <react_native_1.View style={{
        paddingTop: 15,
        flex: 5
    }}>
    <react_native_1.Text style={styles.text}>Изображение выбрано </react_native_1.Text>


    </react_native_1.View>

    <react_native_1.View style={{
        //width: 32,
        //justifyContent: 'flex-end',
        //padding:30,
        paddingBottom: 25,
        flex: 1
    }}>
    <react_native_1.TouchableOpacity onPress={callback}>
    <react_native_1.Image style={{
        width: 32,
        height: 32,
    }} source={require('../../assets/images/delete.png')}/>
    </react_native_1.TouchableOpacity>
    </react_native_1.View>

    </react_native_1.View>);
}
exports.IM = IM;
function RenderPhotoView(im, next, pickNewImage) {
    return (<react_native_1.View style={{
        //flexDirection: 'column',
        flex: 1
    }}>


            <react_native_1.View style={{
        //backgroundColor: 'green',
        //justifyContent: 'space-between',
        //justifyContent: 'flex-start',
        //justifyContent: 'center',
        padding: 5,
        flex: 1,
    }}>

                <react_native_1.View style={{ flex: 1 }}>

                    <react_native_1.Text style={styles.header}>

                        Сделать фото до:

                    </react_native_1.Text>

                </react_native_1.View>

                <react_native_1.View style={{
        //paddingTop: 5,
        //paddingBottom: 0,
        flex: 1,
    }}>
                    <react_native_1.View style={{
        //paddingTop: 5,
        //paddingBottom: 0,
        flex: 1,
    }}>
                        <react_native_1.Button title='Открыть камеру' onPress={function () {
        //fetchData(2)
        //takeFoto()
        pickNewImage(1);
    }}>
                        </react_native_1.Button>
                    </react_native_1.View>

                    <react_native_1.View style={{
        paddingTop: 5,
        //paddingBottom: 0,
        flex: 1,
    }}>
                        <react_native_1.Button title='Выбрать готовое фото' onPress={function () {
        //fetchData(2)
        //ZnakFotoBeforetainZnak()
        pickNewImage(2);
    }}>
                        </react_native_1.Button>
                    </react_native_1.View>

                </react_native_1.View>


                <react_native_1.View style={{ flex: 1 }}>

                    {im}

                </react_native_1.View>


            </react_native_1.View>

            <react_native_1.View style={{
        flex: 1,
        //justifyContent: 'space-between',
        flexDirection: 'column',
        //justifyContent: 'center',
        justifyContent: 'flex-end',
        //backgroundColor: 'red',
        //flexDirection: 'column-reverse',
        padding: 5,
    }}>

                <react_native_1.View style={{ flex: 1 }}/>


                <react_native_1.View style={{
        flex: 1,
    }}>

                    <react_native_1.Button title='Продолжить'
    // style={{ flex: 1,
    // }}
    disabled={!im} onPress={function () {
        next();
    }}>
                    </react_native_1.Button>

                </react_native_1.View>

                <react_native_1.View style={{ flex: 1 }}/>

            </react_native_1.View>

        </react_native_1.View>);
}
exports.RenderPhotoView = RenderPhotoView;
/**
 * @param loading - загружается?
 * @param acc - точность
 * @param rAcc - необходимая точность
 * @param min - минимальная полученная точность
 * @param minCallback - записсать минимальную полученную точность
 * @param rAccCallback - записать необходимую точность
 * @param loadingCallback - записать загружается ли
 * @param GpsCallback - записать результат текущего запроса gps
 * @param next - к следующему экрану
 * @constructor
 */
function RenderGPSView(loading, acc, rAcc, min, minCallback, rAccCallback, loadingCallback, GpsCallback, next) {
    var _a;
    var macc = min === null || min === void 0 ? void 0 : min.coords.accuracy;
    var _b = react_1.useState(false), chAccIsVis = _b[0], setChAccIsVis = _b[1];
    var _c = react_1.useState(false), awaitMenu = _c[0], setAwaitMenu = _c[1];
    var _d = react_1.useState(false), selectRacc = _d[0], setSelectRacc = _d[1];
    var accIc = function (a) { return a || a === 0 ? (a <= exports.al.high ? colors.green : a <= exports.al.low ? colors.yellow : colors.red) : colors.gray; };
    var accMarck = macc || macc === 0 ? (macc <= exports.al.high ? 'Отлично!!!' : macc <= exports.al.mid ? "Удовлетворительно" : macc <= exports.al.low ? "Неудовлетворительно!" : "Плохо!") : "---";
    // @ts-ignore
    return (<react_native_1.View style={{ flex: 1 }}>
            <components_1.CustomModalWindow show={chAccIsVis} message={'Вы уверены, что хотите изменить допустимую точность локации?'} color={colors.red} buttons={[
        { title: "Отмена", onPress: function () { setChAccIsVis(false); }, style: { backgroundColor: colors.gray, color: colors.green, fontSize: 18, size: 2 } },
        { title: "Подтвердить", onPress: function () { setChAccIsVis(false); setSelectRacc(!selectRacc); }, style: { backgroundColor: colors.gray, color: colors.red, fontSize: 18, size: 2 } }
    ]}/>
            <components_1.CustomModalWindow show={awaitMenu} message={'Пожалуйста дождитесь точной локации!\n \n (Не закрывайте телефон и по возможности держитесь открытого пространства)'} color={'#000000'} buttons={[
        { title: "Подождать", onPress: function () { setAwaitMenu(false); }, style: { backgroundColor: colors.gray, color: '#FFFFFF', fontSize: 18, size: 2 } }
    ]}/>
             <react_native_1.View style={{ flex: 1 }}>
                 {selectRacc &&
        <react_native_1.View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 60 }}>
                     <components_1.MyButton onPress={function () { return rAccCallback(exports.al.high); }} title={"<" + exports.al.high + "\u043C"} style={{ size: 4, backgroundColor: colors.green, color: 'white', fontSize: 30, }}/>
                     <components_1.MyButton onPress={function () { return rAccCallback(exports.al.mid); }} title={exports.al.high + "-" + exports.al.low + "\u043C"} style={{ size: 4, backgroundColor: colors.yellow, color: 'white', fontSize: 30, }}/>
                     <components_1.MyButton onPress={function () { return rAccCallback(exports.al.low + 0.1); }} title={">" + exports.al.low + "\u043C"} style={{ size: 4, backgroundColor: colors.red, color: 'white', fontSize: 30, }}/>
                 </react_native_1.View>
        ||
            <react_native_1.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: accIc(macc) }}>
                     {macc <= exports.al.high && <react_native_1.Text style={styles.GPSText}>
                         Погрешность {macc === null || macc === void 0 ? void 0 : macc.toFixed(4)}м
                     </react_native_1.Text>
                ||
                    <react_native_1.Text style={styles.GPSText}>
                         Уточнение локации
                     </react_native_1.Text>}
                 </react_native_1.View>}
                <react_native_1.View style={{ backgroundColor: colors.transparent, alignItems: 'flex-start', padding: 5, marginBottom: 10 }}>
                    <react_native_1.Text style={[styles.GPSText, { color: accIc(+acc), fontWeight: 'bold' }]}>
                       {acc}м
                    </react_native_1.Text>
                    <react_native_1.Text style={[styles.GPSText, { color: accIc(macc), fontWeight: 'bold' }]}>
                        ~{(_a = min === null || min === void 0 ? void 0 : min.coords.accuracy) === null || _a === void 0 ? void 0 : _a.toFixed(2)}м
                    </react_native_1.Text>
                </react_native_1.View>
                <components_1.TextStroke stroke={0.5} color={'#FFFFFF'}>
                    <react_native_1.Text onPress={function () { return setChAccIsVis(true); }} style={{
        textAlign: "center",
        height: 55,
        paddingBottom: 15,
        textAlignVertical: 'bottom',
        fontSize: 22,
        backgroundColor: '#9d9999',
        color: accIc(rAcc)
    }}>
                        Целевая точность: {rAcc < 4.6 ? rAcc : '>4.5'}м.
                    </react_native_1.Text>
                </components_1.TextStroke>
                <react_native_1.View style={{ paddingTop: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <react_native_1.Text style={[styles.text, { color: colors.gray }]}>Оценка точности</react_native_1.Text>
                    <react_native_1.Text style={[styles.text, { color: accIc(macc) }]}> {accMarck} </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>

                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>











                <react_native_1.View style={{ flex: 1, }}>
                    <components_1.MyButton style={{ height: 50, backgroundColor: colors.gray, fontSize: 22 }} title='Продолжить' onPress={function () {
        if (macc || macc === 0) {
            if (macc < rAcc) {
                next();
            }
            else if (rAcc > exports.al.low) {
                next();
            }
            else {
                setAwaitMenu(true);
            }
        }
        else {
            setAwaitMenu(true);
        }
    }}/>
                </react_native_1.View>
                </react_native_1.View>
            </react_native_1.View>

        </react_native_1.View>);
}
exports.RenderGPSView = RenderGPSView;
exports.default = pickImage;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    text: {
        fontSize: 20,
        height: 40,
        textAlignVertical: 'bottom',
    },
    input: {
        height: 40,
        backgroundColor: '#eee',
        borderColor: 'gray',
        borderWidth: 1
    },
    GPSText: {
        marginTop: -10,
        textAlign: "center",
        color: 'white',
        height: 40,
        textAlignVertical: 'bottom',
        fontSize: 30,
    },
    header: {
        height: 40,
        textAlignVertical: 'bottom',
        textDecorationLine: 'underline',
        fontSize: 22,
    },
    button: {
        margin: 5
    }
});

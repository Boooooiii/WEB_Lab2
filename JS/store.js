
export default class Store {
    constructor(render) {
        this.state = {
            currentValue: "0",
            previousValue: null,
            operator: null,
            waitingForNewNumber: false
        };
        this.render = render;
    }

    dispatch(actionType, payload) {
        this.state = this.reducer(this.state, actionType, payload);
        this.render(this.state);
    }

    reducer(state, type, payload) {
        switch (type) {
            case 'DIGIT':
                if (state.waitingForNewNumber) {
                    return { ...state, currentValue: payload, waitingForNewNumber: false };
                }
                else if (payload == '.') {
                    if (!state.currentValue.includes('.')) {
                        return {
                            ...state,
                            currentValue: state.currentValue === "0" ? "0" + payload : state.currentValue + payload
                        };
                    } else {
                        return { ...state };
                    }
                } else {
                    return {
                        ...state,
                        currentValue: state.currentValue === "0" ? payload : state.currentValue + payload
                    };
                }
                break;
            case 'OP':
                return {
                    currentValue: "0",
                    previousValue: state.currentValue,
                    operator: payload,
                    waitingForNewNumber: true
                };
                break;
            case 'FAST OP':
                const old_operator = state.operator;
                state.operator = payload;
                const result_f = this.calculate(state);
                return { ...state, currentValue: String(result_f), operator: old_operator };
                break;
            case 'EQUALS':
                const result = this.calculate(state);
                return { ...state, currentValue: String(result), operator: null, previousValue: null };
                break;
            case 'CLEAR':
                return { currentValue: "0", previousValue: null, operator: null, waitingForNewNumber: false };
                break;
            case 'CLEAR CURRENT':
                return { ...state, currentValue: "0" };
            case 'DELETE':
                return {
                    ...state,
                    currentValue: state.currentValue.length > 1 ? state.currentValue.slice(0, -1) : "0"
                };
                break;
            default:
                return state;
        }
    }

    calculate({ previousValue, currentValue, operator }) {
        const a = parseFloat(previousValue);
        const b = parseFloat(currentValue);
        if (operator === '+') return a + b;
        else if (operator === '*') return a * b;
        else if (operator === '/') return a / b;
        else if (operator === '-') return a - b;
        else if (operator === '^2') return b * b;
        else if (operator === '1/') return 1 / b;
        else if (operator === '2sqrt') return Math.sqrt(b);
        else if (operator === '%') return a % b;
        else if (operator === '+/-') return b * -1;
        return b;
    }

}
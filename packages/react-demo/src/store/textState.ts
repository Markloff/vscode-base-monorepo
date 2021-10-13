import {atom, selector, useSetRecoilState} from 'recoil';
import {ee} from "@/views/Home";

export type SongCommonInfo = {
    id: number;
    type: number;
}

const textState = atom<Array<SongCommonInfo>>({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
        const text = get(textState);
        return text.length;
    },
});

const testHookOutInvoke = () => {
    ee.emit('message', '111');
}


export { textState, charCountState, testHookOutInvoke };

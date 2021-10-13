import { observable, action, makeObservable } from 'mobx';

import { createContext } from 'react'

type BasicInfo = {
    a: string;
    b: number;
}

class UserStore {
    @observable
    basicInfo: BasicInfo;
    
    // constructor函数里面可以放一些初始化的action
    constructor() {
        this.basicInfo = {
            a: '',
            b: 1
        }
        makeObservable(this);
        // when如果没有第二个参数，则返回一个promise，配合await或yield使用
    }
    
    @action
    setBasicInfo = (value: BasicInfo) => {
        console.log(value);
        this.basicInfo = value;
    };
}

const userStore = new UserStore();
const userContext = createContext(new UserStore())
export { userStore, userContext }

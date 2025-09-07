import {IViewConstructor, IView} from "../base/BaseView";
export interface ListData<T>{
    items:T[]
}
export interface ListSettings<T,S> extends IViewConstructor<T,S>{
        item:IView<T>,
        activeItemClass:string;
        itemClass:string;
}
import { number } from 'mathjs'
import type { PropType } from 'vue'


export const definePropType = <T>(val: any): PropType<T> => val

type Item = number | string | [] | object

export interface propsDataType{
    name: string,
    age:number
}

type K2 = keyof propsDataType
const ss:K2 = 'name';
const aa:K2 = 'age'
type Obj = {[x:string]:Item}[]


export const messageTypes = ['success', 'info', 'warning', 'error'] as const
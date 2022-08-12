import Allcls from './index'

class CD extends Allcls {
    constructor(){
        super()
        console.log(this.name)
    }
    name = '666666'
    getAdd(){
        return 'size'
    }
}

export default CD;
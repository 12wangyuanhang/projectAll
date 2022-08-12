import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import Model,{ db } from '../../common/model'
import { PoweroffOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { upData } from '../../reducers/notes';

interface noteItemType {
    name: string,
    age: number | string,
    id: number
}

export default function List() {
    const [noteList, setList] = useState([])
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const dispatch = useDispatch();
    const note = useSelector((state:any) => state.note)
    useEffect(()=>{
        Model.getNotes()
        .then((res:any)=>{
            console.log(res)
            setList(res)
        })
    },[])
    useEffect(()=>{
        console.log(note, 987766)
    },[note])
    const addNotes = async () => {
        try {
            const id = await db.notes.add({
                name,
                age
            });
            message.success(`notes ${name} successfully added. Got id ${id}`)
        } catch (error) {
            message.error(`Failed to add ${name}: ${error}`)
        }
    }
    const upDataNote = (data:noteItemType) => {
        dispatch(upData(data))
    }
    return <div className='note-list'>
        <div className='note-list_topbar'>
            name:<Input value={name} onChange={ev=>setName(ev.target.value)}></Input>
            age:<Input value={age} onChange={ev=>setAge(ev.target.value)}></Input>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addNotes}
        />
        {
            noteList && noteList.map((item:noteItemType)=>{
                return (<div key={item.id} onClick={()=>upDataNote(item)} className='note-list_note'>
                    <div className='note-list_title'>
                        {item.name}
                    </div>
                    <div className='note-list_detail'>
                        {
                            item.age
                        }
                    </div>
                </div>)
            })
        }
    </div>
}
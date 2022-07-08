import { Select, Table, Tag, Modal,Input,DatePicker } from 'antd'
import React,{useState} from 'react'
import 'antd/dist/antd.css'
import moment from 'moment';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'

function NotesList({notes, delAddNote, editNote}) {
    const [isEditing,setIsEditing] = useState();
    const [AlreadySelectedRows, setAlreadySelectedRows] = useState([])
    const [editingTodo, seteditingTodo] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const columns = [
        {
            title:"Entry Time",
            dataIndex:"time",
            key:"key",
            sorter:(a,b) => a.time - b.time
        },
        {
            title:"Title",
            dataIndex:"title",
            key:"key",
            sorter:(a,b) => a.title - b.title,
            filterDropdown:({setSelectedKeys, selectedKeys, confirm})=>{
                return <Input value={selectedKeys} autoFocus placeholder='Type Text Here' onChange={(e)=>{
                    setSelectedKeys(e.target.value?[e.target.value]:[]) 
                }} onPressEnter={()=>{confirm()}} onBlur={() => {confirm()}}></Input>;
            },
            filterIcon:() =>{
                return <BsSearch />
            },
            onFilter:(value,record)=>{
                return record.title.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title:"Description",
            dataIndex:"desc",
            key:"key",
            sorter:(a,b) => a.desc - b.desc,
            filterDropdown:({setSelectedKeys, selectedKeys, confirm})=>{
                return <Input value={selectedKeys} autoFocus placeholder='Type Text Here' onChange={(e)=>{
                    setSelectedKeys(e.target.value?[e.target.value]:[]) 
                }} onPressEnter={()=>{confirm()}} onBlur={() => {confirm()}}></Input>;
            },
            filterIcon:() =>{
                return <BsSearch />
            },
            onFilter:(value,record)=>{
                return record.desc.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title:"Due-Date",
            dataIndex:"duedate",
            key:"key",
            sorter:(a,b) => a.duedate - b.duedate
        },
        {
            title:"Tag",
            dataIndex:"tag",
            key:"key",
            filterDropdown:({setSelectedKeys, selectedKeys, confirm})=>{
                return <Input value={selectedKeys} autoFocus placeholder='Type Text Here' onChange={(e)=>{
                    setSelectedKeys(e.target.value?[e.target.value]:[]) 
                }} onPressEnter={()=>{confirm()}} onBlur={() => {confirm()}}></Input>;
            },
            filterIcon:() =>{
                return <BsSearch />
            },
            onFilter:(value,record)=>{
                return record.tag.toLowerCase().includes(value.toLowerCase())
            }
        },
        {

        },
        {
            title:"Status",
            dataIndex:"status",
            key:"key",
            render:(status) => {
                const color = status.includes('Done')?'Green':status.includes('Working')?'Yellow':status.includes('OverDue')?'Red':'Blue'
                return <Tag color={color}>{status}</Tag>
            },
            filterDropdown:({setSelectedKeys, selectedKeys, confirm})=>{
                return <Input value={selectedKeys} autoFocus placeholder='Type Text Here' onChange={(e)=>{
                    setSelectedKeys(e.target.value?[e.target.value]:[]) 
                }} onPressEnter={()=>{confirm()}} onBlur={() => {confirm()}}></Input>;
            },
            filterIcon:() =>{
                return <BsSearch />
            },
            onFilter:(value,record)=>{
                return record.status.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title:'Actions',
            key:"key",
            render:(record)=>{
                return<>
                <AiOutlineEdit onClick={()=>{
                    onEditSudent(record)
                }}/>
                <AiOutlineDelete onClick={()=>{
                    onDeleteSudent(record)
                }} style={{color:'red',marginLeft:12}} />
                </>
            }
        }
    ]

    const onDeleteSudent = (record)=>{
        Modal.confirm({
            title:'Are you sure you want to delete this item?',
            okText:'Yes',
            okType:"danger",
            onOk:()=>{
                delAddNote(record)
            }
        })

    }

    const onEditSudent = (record) => {
        setIsEditing(true);
        seteditingTodo({...record})
    }



    const range = (start, end) => {
        const result = [];
      
        for (let i = start; i < end; i++) {
          result.push(i);
        }
      
        return result;
      };
      
      const disabledDate = (current) => {
        return current && current < moment().endOf('day');
      };
      
      const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      });

      const resetEditing=()=>{
        setIsEditing(false);
        seteditingTodo(null)
      }

  return (
    <div>
        <Table dataSource={notes} columns={columns} pagination={true} rowSelection={{
            type:'checkbox',
            selectedRowKeys:AlreadySelectedRows,
            onChange:(keys)=>{setAlreadySelectedRows(keys)},
            selections:[
                Table.SELECTION_NONE,
                Table.SELECTION_ALL,
                {
                    key:'Done',
                    text:"Select Finished ToDos",
                    onSelect:(allKeys) =>{
                        const selectedKeys = allKeys.filter(key =>{
                            const doneTodos = notes.find(todo=>{
                                return todo.key == key && todo.status.includes('Done');
                            })
                            return doneTodos;
                        })
                        setAlreadySelectedRows(selectedKeys)
                    }

                }
            ]
        }}></Table>
        <Modal title="Edit Entry" visible={isEditing} onCancel={() => {resetEditing()}} 
        onOk={()=>{
            editNote(editingTodo)
            resetEditing()}} okText='Save'>
        <Input value={editingTodo?.title} onChange={(e)=>{
            seteditingTodo(pre=>{return {...pre, title:e.target.value}})
        }} /> <br/><br/>
        <Input value={editingTodo?.desc} onChange={(e)=>{
            seteditingTodo(pre=>{return {...pre, desc:e.target.value}})
        }}/><br/><br/>
        <DatePicker
      format="YYYY-MM-DD"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{
        defaultValue: moment('00:00:00', 'HH:mm:ss'),
      }} style={{width:"100%"}}
      showNow={false} placeholder={editingTodo?.duedate} onChange={(e)=>{
        seteditingTodo(pre=>{return {...pre, duedate:e._d.toLocaleDateString()}})
    }}
    /><br/><br/>
        <Input value={editingTodo?.tag} onChange={(e)=>{
            seteditingTodo(pre=>{return {...pre, tag:e.target.value}})
        }}/><br/><br/>
        <Select placeholder={editingTodo?.status} defaultValue={editingTodo?.status} onChange={(e)=>{
            seteditingTodo(pre=>{return {...pre, status:e}})
            
        }}>
                    <Select.Option value="Open">Open</Select.Option>
                    <Select.Option value="Working">Working</Select.Option>
                    <Select.Option value="Done">Done</Select.Option>
                    <Select.Option value="OverDue">OverDue</Select.Option>
                </Select>
        </Modal>
    </div>
  )
}

export default NotesList
import React, { useState } from 'react'
import {Form, Input, Button,DatePicker, message, Alert, Select} from "antd";
import moment from 'moment';
function Notes({handleAddNote}) {
    const [noteText, setNoteText] = useState([]);
    const onFinish = (e) => {
        handleAddNote(e)
        console.log(e)
        setTimeout(()=>{
            message.success('Work Added SuccessFully')
        }, 1000);
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
  return (
    <div>
        <Form wrapperCol={{span:14}} labelCol={{span:10}} onFinish={onFinish}>
            <Form.Item label="Title" name="title" required>
                <Input placeholder="Title" required></Input>
            </Form.Item>
            <Form.Item label="Description" name="description" required>
                <Input placeholder="Description" required></Input>
            </Form.Item>
            <Form.Item label="Duedate" name="duedate">
            <DatePicker
      format="YYYY-MM-DD"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{
        defaultValue: moment('00:00:00', 'HH:mm:ss'),
      }} style={{width:"100%"}}
      showNow={false}
    />
            </Form.Item>
            <Form.Item label="Tag" name="tag">
                <Input placeholder="Tag"></Input>
            </Form.Item>
            <Form.Item label="Status" name="status" required>
                <Select placeholder='Status' required>
                    <Select.Option value="Open">Open</Select.Option>
                    <Select.Option value="Working">Working</Select.Option>
                    <Select.Option value="Done">Done</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{span:24}}>
                <Button block type="primary" htmlType="submit">Add ToDos</Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Notes
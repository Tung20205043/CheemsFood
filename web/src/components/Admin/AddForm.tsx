import { Button, Form, Input, Select } from 'antd'
import React, { useState, useEffect } from 'react'

const { Option } = Select

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
}
let DataDanhMuc = [
	{
		categoryId: 1,
		foodId: 1,
		foodName: 'Hambager',
		categogy_name: 'FastFood',
		categogy_type: 'Food',
	},
	{
		category_id: 2,
		foodId: 2,
		foodName: 'Volka',
		categogy_name: 'Sake',
		categogy_type: 'Drink',
	},
	{
		category_id: 3,
		foodId: 3,
		foodName: 'Miso',
		categogy_name: 'TinhBot',
		categogy_type: 'Food',
	},
	// Add more food items here...
	{
		category_id: 4,
		foodId: 4,
		foodName: 'Salad',
		categogy_name: 'Vegetable',
		categogy_type: 'Food',
	},
	// Add more food items here...
	{
		category_id: 5,
		foodId: 5,
		foodName: 'PizzaItaly',
		categogy_name: 'Pizza',
		categogy_type: 'Food',
	},
]



interface MyComponentProps {
	index: number
	destroy: () => void
}
const AddForm: React.FC<MyComponentProps> = (props) => {
	const [form] = Form.useForm()
	let [data,setData] = useState(null);
	let ft = async() => {
		if(props.index != -1){
			const response = await fetch('http://localhost:4001/food');
			let js = await response.json();
			if(response.ok){
				setData(js[props.index]); 
			}
		}
		
	  }
	  
	useEffect(() => {
		ft();
	  },[]
	  )
	  console.log(data);
	const onFinish = (values: any) => {
		console.log(values)
	}

	const onReset = () => {
		form.resetFields()
	}

	return (
		<Form {...layout} form={form} name='control-hooks' onFinish={onFinish} style={{ maxWidth: 600 }}>
			<Form.Item name='foodName' label='Food Name' rules={[{ required: true }]}>
				<Input
					value={data == null ||props.index == null || props.index == -1 ? '' : "!"}
					placeholder={props.index == null || props.index == -1 ? '' : DataDanhMuc[props.index].foodName}
				/>
			</Form.Item>
			<Form.Item name='category_type' label='Type' rules={[{ required: true }]}>
				<Select
					value={props.index == null || props.index == -1 ? '' : DataDanhMuc[props.index].categogy_type}
					placeholder={props.index == null || props.index == -1 ? '' : DataDanhMuc[props.index].categogy_type}
					allowClear>
					<Option value='Thực phẩm tươi'>Thực phẩm tươi</Option>
					<Option value='Rau-Củ-Quả'>Rau-Củ-Quả</Option>
					<Option value='Thực phẩm ăn liền'>Thực phẩm ăn liền</Option>
					<Option value='Sữa'>Sữa</Option>
					<Option value='Gia vị'>Gia vị</Option>
					<Option value='Thực phẩm khô'>Thực phẩm khô</Option>
					<Option value='Đồ hộp'>Đồ hộp</Option>
					<Option value='Bột'>Bột</Option>
					<Option value='Đồ uống'>Đồ uống</Option>
					<Option value='Trứng'>Trứng</Option>
					<Option value='Chả giò'>Chả giò</Option>
					<Option value='Khác'>Khác</Option>
				</Select>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}></Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
				{props.destroy != null && (
					<Button htmlType='button' onClick={props.destroy}>
						Hủy
					</Button>
				)}
			</Form.Item>
		</Form>
	)
}

export default AddForm

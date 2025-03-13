import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Checkbox } from 'antd';
import moment from 'moment';

const { Option } = Select;

type Service = {
  id: number;
  name: string;
  price: number; // Thêm trường price cho dịch vụ
};

type Appointment = {
  id: number;
  customerName: string;
  service: string;
  staff: string;
  date: string;
  price: number;
  completed: boolean;
};

const Schedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const storedAppointments = localStorage.getItem('appointments');
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  });

  const [services, setServices] = useState<Service[]>([]);
  const [staffs, setStaffs] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    const storedStaffs = localStorage.getItem('staffs');
    
    setServices(storedServices ? JSON.parse(storedServices) : []);
    setStaffs(storedStaffs ? JSON.parse(storedStaffs).map((s: any) => s.name) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleEdit = (record: Appointment) => {
    setEditingAppointment(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date),
    });
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const updatedAppointments = appointments.filter((item) => item.id !== id);
    setAppointments(updatedAppointments);
    message.success('Xóa lịch hẹn thành công!');
  };

  const handleComplete = (id: number) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, completed: !appointment.completed } : appointment
    );
    setAppointments(updatedAppointments);
    message.success('Cập nhật trạng thái lịch hẹn thành công!');
  };

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        const formattedDate = values.date ? values.date.format('YYYY-MM-DD') : '';
        const servicePrice = services.find(service => service.name === values.service)?.price || 0;
        const newValues = { 
          ...values, 
          date: formattedDate, 
          completed: false, 
          price: servicePrice // Lấy giá từ dịch vụ
        };

        if (editingAppointment) {
          const updatedAppointment: Appointment = { id: editingAppointment.id, ...newValues };
          setAppointments(appointments.map((item) => (item.id === editingAppointment.id ? updatedAppointment : item)));
          message.success('Cập nhật lịch hẹn thành công!');
        } else {
          const newAppointment = { id: appointments.length + 1, ...newValues };
          setAppointments([...appointments, newAppointment]);
          message.success('Thêm lịch hẹn thành công!');
        }

        setModalVisible(false);
        setEditingAppointment(null);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Validation Failed:', error);
      });
  };

  const columns = [
    { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    { title: 'Nhân viên', dataIndex: 'staff', key: 'staff' },
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price', 
      render: (value: number) => (typeof value === 'number' ? value.toLocaleString() + ' VNĐ' : 'Chưa có giá') 
    }, // Cột hiển thị giá
    {
      title: 'Hoàn thành',
      dataIndex: 'completed',
      key: 'completed',
      render: (_: any, record: Appointment) => (
        <Checkbox checked={record.completed} onChange={() => handleComplete(record.id)}>
          {record.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </Checkbox>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Appointment) => (
        <>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger style={{ marginLeft: 8 }}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { form.resetFields(); setModalVisible(true); }}>
        Thêm lịch hẹn
      </Button>
      <h2>Danh sách lịch hẹn</h2>
      <Table columns={columns} dataSource={appointments} rowKey="id" style={{ marginTop: 16 }} />
      
      <Modal 
        title={editingAppointment ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn'} 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="service" label="Dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}> 
            <Select>
              {services.map((service) => (
                <Option key={service.name} value={service.name}>{service.name}</Option>
              ))}
            </Select> 
          </Form.Item>
          <Form.Item name="staff" label="Nhân viên" rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}> 
            <Select>
              {staffs.map((staff) => (
                <Option key={staff} value={staff}>{staff}</Option>
              ))}
            </Select> 
          </Form.Item>
          <Form.Item name="date" label="Ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}> 
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Schedule;

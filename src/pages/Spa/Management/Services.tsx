import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

type Service = {
  id: number;
  name: string;
  price: string;
  duration: string;
};

const Services: React.FC = () => {
  // Lấy danh sách dịch vụ từ localStorage khi tải trang
  const [services, setServices] = useState<Service[]>(() => {
    const storedServices = localStorage.getItem('services');
    return storedServices ? JSON.parse(storedServices) : [];
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  // Lưu danh sách dịch vụ vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  // Xử lý khi nhấn nút "Sửa"
  const handleEditService = (record: Service) => {
    setEditingService(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDeleteService = (id: number) => {
    const updatedServices = services.filter((item) => item.id !== id);
    setServices(updatedServices);
    message.success('Xóa dịch vụ thành công!');
  };

  // Xử lý khi submit form (Thêm mới hoặc Cập nhật)
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingService) {
        // Cập nhật dịch vụ
        const updatedService: Service = { id: editingService.id, ...values };
        setServices(services.map((item) => (item.id === editingService.id ? updatedService : item)));
        message.success('Cập nhật dịch vụ thành công!');
        setEditingService(null);
      } else {
        // Thêm dịch vụ mới
        const newService: Service = { id: services.length + 1, ...values };
        setServices([...services, newService]);
        message.success('Thêm dịch vụ thành công!');
      }

      setModalVisible(false);
      form.resetFields();
    });
  };

  // Cấu hình cột cho bảng danh sách dịch vụ
  const serviceColumns = [
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Thời gian thực hiện', dataIndex: 'duration', key: 'duration' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Service) => (
        <>
          <Button onClick={() => handleEditService(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteService(record.id)} danger style={{ marginLeft: 8 }}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { form.resetFields(); setModalVisible(true); }}>
        Thêm dịch vụ
      </Button>
      <h2>Danh sách dịch vụ</h2>
      <Table columns={serviceColumns} dataSource={services} rowKey="id" style={{ marginTop: 16 }} />
      
      {/* Modal Form */}
      <Modal 
        title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'} 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <Input placeholder="Ví dụ: 500,000 VND" />
          </Form.Item>
          <Form.Item name="duration" label="Thời gian thực hiện" rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]}>
            <Input placeholder="Ví dụ: 60 phút" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Services;
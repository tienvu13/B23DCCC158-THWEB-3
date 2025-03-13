import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

type Staff = {
  id: number;
  name: string;
  position: string;
  workingHours: string; // Đổi từ số điện thoại thành giờ làm việc
};

const StaffManagement: React.FC = () => {
  // Lấy danh sách nhân viên từ localStorage khi tải trang
  const [staffs, setStaffs] = useState<Staff[]>(() => {
    const storedStaffs = localStorage.getItem('staffs');
    return storedStaffs ? JSON.parse(storedStaffs) : [];
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [form] = Form.useForm();

  // Lưu danh sách nhân viên vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem('staffs', JSON.stringify(staffs));
  }, [staffs]);

  // Xử lý khi nhấn nút "Sửa"
  const handleEditStaff = (record: Staff) => {
    setEditingStaff(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDeleteStaff = (id: number) => {
    const updatedStaffs = staffs.filter((item) => item.id !== id);
    setStaffs(updatedStaffs);
    message.success('Xóa nhân viên thành công!');
  };

  // Xử lý khi submit form (Thêm mới hoặc Cập nhật)
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingStaff) {
        // Cập nhật nhân viên
        const updatedStaff: Staff = { id: editingStaff.id, ...values };
        setStaffs(staffs.map((item) => (item.id === editingStaff.id ? updatedStaff : item)));
        message.success('Cập nhật nhân viên thành công!');
        setEditingStaff(null);
      } else {
        // Thêm nhân viên mới
        const newStaff: Staff = { id: staffs.length + 1, ...values };
        setStaffs([...staffs, newStaff]);
        message.success('Thêm nhân viên thành công!');
      }

      setModalVisible(false);
      form.resetFields();
    });
  };

  // Cấu hình cột cho bảng danh sách nhân viên
  const staffColumns = [
    { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
    { title: 'Vị trí', dataIndex: 'position', key: 'position' },
    { title: 'Giờ làm việc', dataIndex: 'workingHours', key: 'workingHours' }, // Cập nhật cột giờ làm việc
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Staff) => (
        <>
          <Button onClick={() => handleEditStaff(record)}>Sửa</Button>
          <Button onClick={() => handleDeleteStaff(record.id)} danger style={{ marginLeft: 8 }}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => { form.resetFields(); setModalVisible(true); }}>
        Thêm nhân viên
      </Button>
      <h2>Danh sách nhân viên</h2>
      <Table columns={staffColumns} dataSource={staffs} rowKey="id" style={{ marginTop: 16 }} />
      
      {/* Modal Form */}
      <Modal 
        title={editingStaff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'} 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="position" label="Vị trí" rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="workingHours" label="Giờ làm việc" rules={[{ required: true, message: 'Vui lòng nhập giờ làm việc' }]}> 
            <Input placeholder="Ví dụ: 9h-17h Thứ 6" /> 
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StaffManagement;
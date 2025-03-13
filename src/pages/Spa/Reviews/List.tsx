import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Rate, message } from 'antd';

type Review = {
  id: number;
  customerName: string;
  service: string;
  feedback?: string;
  rating?: number;
};

const ListReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const completedAppointments = JSON.parse(storedAppointments).filter((a: any) => a.completed);
      setReviews(completedAppointments);
    }
  }, []);

  const handleEdit = (record: Review) => {
    setEditingReview(record);
    form.setFieldsValue({ feedback: record.feedback || '', rating: record.rating || 0 });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingReview) {
        const updatedReviews = reviews.map((item) =>
          item.id === editingReview.id ? { ...item, ...values } : item
        );
        setReviews(updatedReviews);
        
        // Cập nhật localStorage
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
          const updatedAppointments = JSON.parse(storedAppointments).map((appointment: any) =>
            appointment.id === editingReview.id ? { ...appointment, ...values } : appointment
          );
          localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        }

        message.success('Cập nhật đánh giá thành công!');
      }
      setModalVisible(false);
      setEditingReview(null);
      form.resetFields();
    });
  };

  const columns = [
    { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    {
      title: 'Đánh giá',
      dataIndex: 'feedback',
      key: 'feedback',
      render: (text: string) => (text ? text : 'Chưa có đánh giá'),
    },
    {
      title: 'Điểm số',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Review) => (
        <Button onClick={() => handleEdit(record)}>Đánh giá</Button>
      ),
    },
  ];

  return (
    <>
      <h2>Danh sách lịch hẹn đã hoàn thành</h2>
      <Table columns={columns} dataSource={reviews} rowKey="id" style={{ marginTop: 16 }} />

      <Modal title="Đánh giá dịch vụ" visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="rating" label="Điểm số" rules={[{ required: true, message: 'Vui lòng đánh giá sao' }]}>
            <Rate />
          </Form.Item>
          <Form.Item name="feedback" label="Nhận xét">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListReviews;
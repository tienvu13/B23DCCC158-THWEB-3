import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Rate, message } from 'antd';

type Review = {
  id: number;
  customerName: string;
  service: string;
  feedback?: string;
  rating?: number;
  response?: string;
};

const Responses: React.FC = () => {
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

  const handleRespond = (record: Review) => {
    setEditingReview(record);
    form.setFieldsValue({ response: record.response || '' });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingReview) {
        const updatedReviews = reviews.map((item) =>
          item.id === editingReview.id ? { ...item, response: values.response } : item
        );
        setReviews(updatedReviews);

        // Cập nhật vào localStorage
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
          const updatedAppointments = JSON.parse(storedAppointments).map((appointment: any) =>
            appointment.id === editingReview.id ? { ...appointment, response: values.response } : appointment
          );
          localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        }

        message.success('Phản hồi đã được lưu!');
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
      title: 'Số sao',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Phản hồi',
      dataIndex: 'response',
      key: 'response',
      render: (text: string) => (text ? text : 'Chưa có phản hồi'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Review) => (
        <Button onClick={() => handleRespond(record)}>Phản hồi</Button>
      ),
    },
  ];

  return (
    <>
      <h2>Phản hồi đánh giá khách hàng</h2>
      <Table columns={columns} dataSource={reviews} rowKey="id" style={{ marginTop: 16 }} />

      <Modal title="Phản hồi đánh giá" visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="response" label="Nội dung phản hồi" rules={[{ required: true, message: 'Vui lòng nhập phản hồi' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Responses;
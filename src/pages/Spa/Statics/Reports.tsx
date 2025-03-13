import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';

type Appointment = {
  id: number;
  service: string;
  price: number;
  date: string;
  completed: boolean;
};

const Reports: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const [serviceRevenue, setServiceRevenue] = useState<{ service: string; revenue: number }[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const data: Appointment[] = JSON.parse(storedAppointments);

      // Chỉ lấy lịch hẹn đã hoàn thành
      const completedAppointments = data.filter((a) => a.completed);

      // Tính tổng doanh thu
      const total = completedAppointments.reduce((sum, item) => sum + (item.price || 0), 0);
      setTotalRevenue(total);

      // Tính tổng số lịch hẹn đã hoàn thành
      setTotalAppointments(completedAppointments.length);

      // Tính doanh thu theo từng dịch vụ
      const serviceMap: Record<string, number> = {};

      completedAppointments.forEach(({ service, price }) => {
        if (typeof price === 'number') {
          serviceMap[service] = (serviceMap[service] || 0) + price;
        }
      });

      const serviceRevenueData = Object.entries(serviceMap).map(([service, revenue]) => ({
        service,
        revenue,
      }));

      setServiceRevenue(serviceRevenueData);
    }
  }, []);

  const columns = [
    { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
    { 
      title: 'Doanh thu (VNĐ)', 
      dataIndex: 'revenue', 
      key: 'revenue',
      render: (value: number) => value.toLocaleString() + ' VNĐ',
    },
  ];

  return (
    <>
      <h2>Thống kê doanh thu & lịch hẹn</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Card title="Tổng doanh thu" style={{ width: 200 }}>
          <b>{totalRevenue.toLocaleString()} VNĐ</b>
        </Card>
        <Card title="Tổng lịch hẹn đã hoàn thành" style={{ width: 250 }}>
          <b>{totalAppointments}</b>
        </Card>
      </div>
      <Table columns={columns} dataSource={serviceRevenue} rowKey="service" />
    </>
  );
};

export default Reports;
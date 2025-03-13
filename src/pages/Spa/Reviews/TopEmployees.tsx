import React, { useState, useEffect } from 'react';
import { Table, Rate } from 'antd';

type EmployeeRating = {
  staff: string;
  averageRating: number;
  totalReviews: number;
};

const TopEmployees: React.FC = () => {
  const [employeeRatings, setEmployeeRatings] = useState<EmployeeRating[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      const appointments = JSON.parse(storedAppointments);

      // Lọc chỉ lấy lịch hẹn đã hoàn thành có đánh giá
      const completedAppointments = appointments.filter((a: any) => a.completed && a.rating);

      // Gom nhóm và tính trung bình số sao cho từng nhân viên
      const ratingsMap = completedAppointments.reduce((acc: any, appointment: any) => {
        if (!acc[appointment.staff]) {
          acc[appointment.staff] = { totalStars: 0, count: 0 };
        }
        acc[appointment.staff].totalStars += appointment.rating;
        acc[appointment.staff].count += 1;
        return acc;
      }, {});

      // Chuyển đổi sang mảng và tính trung bình số sao
      const ratingsArray = Object.keys(ratingsMap).map((staff) => ({
        staff,
        averageRating: ratingsMap[staff].totalStars / ratingsMap[staff].count,
        totalReviews: ratingsMap[staff].count,
      }));

      // Sắp xếp theo số sao trung bình từ cao đến thấp
      ratingsArray.sort((a, b) => b.averageRating - a.averageRating);

      setEmployeeRatings(ratingsArray);
    }
  }, []);

  const columns = [
    { title: 'Nhân viên', dataIndex: 'staff', key: 'staff' },
    { title: 'Số lượt đánh giá', dataIndex: 'totalReviews', key: 'totalReviews' },
    {
      title: 'Số sao trung bình',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating: number) => <Rate disabled allowHalf value={rating} />,
    },
  ];

  return (
    <>
      <h2>Nhân viên được đánh giá cao</h2>
      <Table columns={columns} dataSource={employeeRatings} rowKey="staff" style={{ marginTop: 16 }} />
    </>
  );
};

export default TopEmployees;
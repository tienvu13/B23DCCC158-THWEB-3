import React, { useState } from 'react';
import { Button, Input, Table, DatePicker } from 'antd';
import dayjs from 'dayjs';

const QuanLyTienDo: React.FC = () => {
  const [tienDo, setTienDo] = useState<{ mon: string; ngay: string; thoiLuong: number; noiDung: string }[]>([]);
  const [mon, setMon] = useState('');
  const [ngay, setNgay] = useState<string>(''); 
  const [thoiLuong, setThoiLuong] = useState<number | undefined>(undefined);
  const [noiDung, setNoiDung] = useState('');

  const handleThemTienDo = () => {
    if (mon && ngay && thoiLuong && noiDung) {
      setTienDo([...tienDo, { mon, ngay, thoiLuong, noiDung }]);
      setMon('');
      setNgay('');
      setThoiLuong(undefined);
      setNoiDung('');
    }
  };

  const columns = [
    { title: 'Môn Học', dataIndex: 'mon', key: 'mon' },
    { title: 'Ngày', dataIndex: 'ngay', key: 'ngay' },
    { title: 'Thời Lượng (giờ)', dataIndex: 'thoiLuong', key: 'thoiLuong' },
    { title: 'Nội Dung', dataIndex: 'noiDung', key: 'noiDung' },
  ];

  return (
    <div className="quan-ly-tien-do">
      <h3>Quản lý Tiến Độ Học Tập</h3>
      <Input
        value={mon}
        onChange={(e) => setMon(e.target.value)}
        placeholder="Tên môn học"
        style={{ width: 200, marginRight: 10 }}
      />
      <DatePicker
        onChange={(date) => setNgay(date ? dayjs().format('YYYY-MM-DD') : '')}
        placeholder="Chọn ngày"
        style={{ marginRight: 10 }}
      />
      <Input
        type="number"
        value={thoiLuong}
        onChange={(e) => setThoiLuong(Number(e.target.value))}
        placeholder="Thời lượng (giờ)"
        style={{ width: 150, marginRight: 10 }}
      />
      <Input.TextArea
        value={noiDung}
        onChange={(e) => setNoiDung(e.target.value)}
        placeholder="Nội dung đã học"
        style={{ width: 300, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleThemTienDo}>
        Thêm Tiến Độ
      </Button>
      <Table 
        dataSource={tienDo.map((td, index) => ({ key: index, ...td }))} 
        columns={columns} 
        style={{ marginTop: 20 }} 
      />
    </div>
  );
};

export default QuanLyTienDo;

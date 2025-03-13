import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Checkbox, message, Row, Col } from 'antd';

const ThietLapMucTieu: React.FC = () => {
  const [mucTieu, setMucTieu] = useState<{ mon: string; thoiLuong: number; hoanThanh: boolean }[]>([]);
  const [mon, setMon] = useState('');
  const [thoiLuong, setThoiLuong] = useState<number | undefined>(undefined);

  // Tải dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedMucTieu = localStorage.getItem('mucTieu');
    if (savedMucTieu) {
      setMucTieu(JSON.parse(savedMucTieu));
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi mucTieu thay đổi
  useEffect(() => {
    localStorage.setItem('mucTieu', JSON.stringify(mucTieu));
  }, [mucTieu]);

  const handleThemMucTieu = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!mon.trim()) {
      message.error('Vui lòng nhập tên môn học.');
      return;
    }
    if (thoiLuong === undefined || thoiLuong <= 0) {
      message.error('Vui lòng nhập thời lượng hợp lệ.');
      return;
    }
    
    setMucTieu([...mucTieu, { mon, thoiLuong, hoanThanh: false }]);
    setMon('');
    setThoiLuong(undefined);
    message.success('Mục tiêu đã được thêm thành công!');
  };

  const handleToggleHoanThanh = (index: number) => {
    const newMucTieu = [...mucTieu];
    newMucTieu[index].hoanThanh = !newMucTieu[index].hoanThanh;
    setMucTieu(newMucTieu);
  };

  const handleXoaMucTieu = (index: number) => {
    const newMucTieu = [...mucTieu];
    newMucTieu.splice(index, 1);  // Xóa mục tiêu ở vị trí index
    setMucTieu(newMucTieu);
  };

  const columns = [
    { title: 'Môn Học', dataIndex: 'mon', key: 'mon' },
    { title: 'Thời Lượng (giờ)', dataIndex: 'thoiLuong', key: 'thoiLuong' },
    {
      title: 'Trạng Thái',
      key: 'hoanThanh',
      render: (_: any, record: { hoanThanh: boolean }, index: number) => (
        <Checkbox
          checked={record.hoanThanh}
          onChange={() => handleToggleHoanThanh(index)}
        >
          {record.hoanThanh ? 'Hoàn thành' : 'Chưa hoàn thành'}
        </Checkbox>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record: any, index: number) => (
        <Button onClick={() => handleXoaMucTieu(index)} type='default'>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3>Thiết Lập Mục Tiêu Học Tập</h3>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <Input
            value={mon}
            onChange={(e) => setMon(e.target.value)}
            placeholder='Tên môn học'
            style={{ width: 200, marginRight: 10 }}
          />
        </Col>
        <Col>
          <Input
            type='number'
            value={thoiLuong}
            onChange={(e) => setThoiLuong(Number(e.target.value))}
            placeholder='Thời lượng (giờ)'
            style={{ width: 150, marginRight: 10 }}
          />
        </Col>
        <Col>
          <Button type='primary' onClick={handleThemMucTieu}>
            Thêm Mục Tiêu
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={mucTieu.map((mt, index) => ({ key: index, ...mt }))}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default ThietLapMucTieu;

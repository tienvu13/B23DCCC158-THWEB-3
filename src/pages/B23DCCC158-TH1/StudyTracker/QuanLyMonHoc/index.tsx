import React, { useState } from 'react';
import { Button, Input, Modal, Table } from 'antd';

const QuanLyMonHoc: React.FC = () => {
  const [monHoc, setMonHoc] = useState<string[]>([]);
  const [tenMonMoi, setTenMonMoi] = useState('');
  const [monDangSua, setMonDangSua] = useState<string | null>(null);
  const [giaTriMoi, setGiaTriMoi] = useState('');

  const themMonHoc = () => {
    if (tenMonMoi.trim() !== '' && !monHoc.includes(tenMonMoi)) {
      setMonHoc([...monHoc, tenMonMoi]);
      setTenMonMoi('');
    }
  };

  const xoaMonHoc = (monCanXoa: string) => {
    setMonHoc(monHoc.filter((mon) => mon !== monCanXoa));
  };

  const suaMonHoc = (mon: string) => {
    setMonDangSua(mon);
    setGiaTriMoi(mon);
  };

  const luuMonHoc = () => {
    if (monDangSua && giaTriMoi.trim() !== '') {
      setMonHoc(monHoc.map((mon) => (mon === monDangSua ? giaTriMoi : mon)));
    }
    setMonDangSua(null);
  };

  const columns = [
    { title: 'Môn Học', dataIndex: 'mon', key: 'mon' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: { mon: string }) => (
        <>
          <Button onClick={() => suaMonHoc(record.mon)} style={{ marginRight: 5 }}>
            Sửa
          </Button>
          <Button type='primary' danger onClick={() => xoaMonHoc(record.mon)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='quan-ly-mon-hoc'>
      <h3>Quản lý Môn Học</h3>
      <Input
        value={tenMonMoi}
        onChange={(e) => setTenMonMoi(e.target.value)}
        placeholder='Nhập tên môn học'
        style={{ width: 300, marginRight: 10 }}
      />
      <Button type='primary' onClick={themMonHoc}>
        Thêm Môn
      </Button>
      <Table
        dataSource={monHoc.map((mon, index) => ({ key: index, mon }))}
        columns={columns}
        style={{ marginTop: 20 }}
      />
      <Modal
        title='Sửa Môn Học'
        visible={!!monDangSua}  // Fix: Dùng visible thay vì open
        onOk={luuMonHoc}
        onCancel={() => setMonDangSua(null)}
      >
        <Input value={giaTriMoi} onChange={(e) => setGiaTriMoi(e.target.value)} />
      </Modal>
    </div>
  );
};

export default QuanLyMonHoc;

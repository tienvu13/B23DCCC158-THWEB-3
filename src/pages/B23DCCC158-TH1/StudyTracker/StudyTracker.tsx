import React from 'react';
import QuanLyMonHoc from './QuanLyMonHoc';
import QuanLyTienDo from './QuanLyTienDo';
import ThietLapMucTieu from './ThietLapMucTieu';

const StudyTracker: React.FC = () => {
    return (
      <div>
        <QuanLyMonHoc />
        <QuanLyTienDo />
        <ThietLapMucTieu />
      </div>
    );
  };
  
  export default StudyTracker;
  
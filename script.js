// Danh sách các file MP3 và tên nút tương ứng
const group1 = [
    { path: 'file_mp3/cac_bai_thi/1_XuatPhat.mp3', name: 'Xuất phát', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/2_NguoiDiBo.mp3', name: 'Dừng xe chờ người đi bộ', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/3_Ngangdoc.mp3', name: 'Dừng xe ngang dốc', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/4_VachVaVuongGoc.mp3', name: 'Vạch vuông góc', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/5_Nga4_1.mp3', name: 'Ngã 4_1', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/6_DuongVong.mp3', name: 'Đường vòng', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/7_GhepDoc.mp3', name: 'Ghép dọc', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/9_ThaydoiSo.mp3', name: 'Thay đổi số', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/10_GhepNgang.mp3', name: 'Ghép ngang', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/5_Nga4_1.mp3', name: 'Ngã 4_22', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/11_KetThuc.mp3', name: 'kết thúc', pointsDeducted: 0 },
    { path: 'file_mp3/cac_bai_thi/KhanCap.mp3', name: 'KhanCap', pointsDeducted: 0 },
  ];
  
  const group2 = [
    { path: 'file_mp3/tinh_diem/ChuaDenVT.mp3', name: 'Chưa đến vị trí', pointsDeducted: 5 },
    { path: 'file_mp3/tinh_diem/KhongXinhan.mp3', name: 'Không xi an', pointsDeducted: 5 },
    { path: 'file_mp3/tinh_diem/NhanBai.mp3', name: 'Nhận bài', pointsDeducted: 0 },
    { path: 'file_mp3/tinh_diem/TinhBai.mp3', name: 'Tính bài', pointsDeducted: 0 }

  ];
  
  let lastClickTime = {};  // Lưu thời gian của lần nhấn cho mỗi nút
  const debounceTime = 1000;  // Thời gian chờ (5 giây)
  let currentScore = 100;  // Điểm hiện tại
  
  // Hàm tạo nút từ nhóm file
  function createButtons(group, containerId) {
    group.forEach((file, index) => {
      const button = document.createElement('button');
      button.textContent = file.name;  // Đặt tên nút
      button.id = `button_${index}`;
      button.onclick = () => handleClick(file.path, file.pointsDeducted, index);
      document.getElementById(containerId).appendChild(button);
    });
  }
  
  // Tạo nút cho nhóm 1 và nhóm 2
  createButtons(group1, 'buttonsGroup1');
  createButtons(group2, 'buttonsGroup2');
  
  function handleClick(filePath, pointsDeducted, index) {
    const currentTime = new Date().getTime();  // Lấy thời gian hiện tại
  
    // Kiểm tra nếu lần nhấn trước cách đây ít hơn 5 giây
    if (lastClickTime[index] && currentTime - lastClickTime[index] < debounceTime) {
      alert("Bạn phải đợi ít nhất 5 giây để nhấn lại!");
      return;  // Nếu nhấn quá nhanh, không làm gì
    }
  
    // Cập nhật thời gian lần nhấn mới
    lastClickTime[index] = currentTime;
  
    // Trừ điểm
    currentScore -= pointsDeducted;
  
    // Cập nhật điểm số hiển thị
    if (currentScore < 0) currentScore = 0; // Đảm bảo điểm không bị âm
    document.getElementById('score').textContent = currentScore;
  
    // Thực hiện hành động khi nhấn nút
    playSound(filePath);
  }
  
  function playSound(filePath) {
    let audio = new Audio(filePath);
    audio.play();
  }
  
  function resetScore() {
    currentScore = 100;  // Reset điểm về 100
    document.getElementById('score').textContent = currentScore;
  }
  
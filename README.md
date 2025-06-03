### 1. Quy tắc đặt tên

- **Folder:** PascalCase  
  _Giúp phân biệt thư mục với file, tăng tính nhất quán và dễ tìm kiếm._
- **File:** PascalCase  
  _Thể hiện rõ file là module/class, dễ nhận biết khi import._
- **Class:** PascalCase  
  _Theo chuẩn OOP, dễ phân biệt với biến/hàm._
- **Function, variable:** camelCase  
  _Đồng nhất với chuẩn JavaScript, dễ đọc, dễ viết._
- **Không dùng `_` cho private**  
  _Giữ code sạch, chỉ dùng khi thực sự cần thiết như singleton._

---

### 2. Quy tắc đặt tên nhánh (branch naming convention)

- **Tính năng mới:**  
  `feature/TenChucNang`  
  _Ví dụ:_ `feature/PlayerMovement`, `feature/EnemyAI`

- **Sửa lỗi:**  
  `fix/TenLoi`  
  _Ví dụ:_ `fix/LoadingBarNotUpdate`, `fix/EnemyHpDisplay`

- **Cải tiến:**  
  `improve/TenCaiTien`  
  _Ví dụ:_ `improve/LoadingSpeed`, `improve/AudioManager`

- **Refactor:**  
  `refactor/TenRefactor`  
  _Ví dụ:_ `refactor/PopupBase`, `refactor/EnemyController`

- **Hotfix:**  
  `hotfix/TenLoiNong`  
  _Ví dụ:_ `hotfix/CrashOnStart`

**Lưu ý:**

- Tiền tố luôn viết thường (`feature/`, `fix/`, ...), phần tên dùng PascalCase.
- Không dùng dấu cách, không ký tự đặc biệt.

## **Push code lên trước 5h30 để cùng nhau preview (vòng tròn).**

### 3. Quy tắc kế thừa & đặt tên class

- **CharacterBase:**  
  _Lớp logic nền tảng cho các loại nhân vật, giúp tái sử dụng và mở rộng hành vi chung._
- **CharacterItem:**  
  _Lớp nền tảng cho UI đại diện nhân vật, giúp quản lý hiển thị và thao tác trên giao diện._

---

### 4. Cấu trúc thư mục & mục đích

```
Assets/
├── Animations/         # Quản lý các file hoạt ảnh, dễ tái sử dụng cho nhiều đối tượng
├── Fonts/              # Lưu trữ font chữ, giúp đồng bộ giao diện
├── Prefabs/            # Chứa các mẫu đối tượng, dễ tái sử dụng và quản lý
│   ├── Enemies/        # Gom nhóm prefab quái, dễ tìm kiếm và mở rộng
│   ├── Players/        # Gom nhóm prefab player
│   └── Popups/         # Gom nhóm prefab popup
├── Scenes/             # Quản lý các cảnh trong game, mỗi scene là một màn chơi/giao diện
├── Scripts/            # Toàn bộ mã nguồn logic, chia module rõ ràng
│   ├── Utils/          # Các hàm tiện ích dùng chung, đặt tên SomethingUtils.js để dễ nhận biết
│   ├── Popups/         # Logic cho popup, tách biệt với prefab và UI
│   ├── Sound/          # Xử lý logic âm thanh, quản lý phát nhạc, hiệu ứng
│   ├── Entities/       # Các thực thể có collider, dễ quản lý va chạm và tương tác
│   │   ├── EntityGroup.js   # Định nghĩa group collider, giúp kiểm soát va chạm
│   │   ├── Enemies/         # Logic cho quái, tách biệt từng loại
│   │   └── Player/          # Logic cho player
│   ├── Scenes/         # Script điều khiển scene, ví dụ: loading, chuyển cảnh
│   ├── Event/          # Quản lý emitter và key sự kiện, giúp code tách rời, dễ mở rộng
│   └── ...             # Các module khác (ví dụ: Network, SaveData, ...)
├── Sounds/             # Chứa nhiều file âm thanh, dễ quản lý và phân loại
├── Spines/             # Lưu trữ file spine cho hoạt ảnh xương, tối ưu hóa animation
├── Sprites/            # Ảnh sprite, chia theo scene hoặc component để dễ tìm kiếm
│   ├── Lobby/          # Sprite cho scene lobby
│   ├── Battle/         # Sprite cho scene battle
│   └── Component/      # Sprite cho các component đặc biệt (ví dụ: popup)
```

---

### 5. Công cụ hỗ trợ

- **draw.io:**  
  _Vẽ sơ đồ kiến trúc, flow, class diagram giúp team dễ hình dung tổng thể dự án và các mối quan hệ giữa các module._
- **Trello:**  
  _Quản lý task, phân chia công việc, theo dõi tiến độ, đảm bảo teamwork hiệu quả._
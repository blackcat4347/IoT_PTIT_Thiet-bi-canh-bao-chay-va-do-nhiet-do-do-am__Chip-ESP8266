import json
import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Đọc dữ liệu từ tệp "database.json"
with open('database.json', 'r') as json_file:
    database_data = json.load(json_file)

# Lấy dữ liệu từ trường "nhietdo" trong đối tượng dữ liệu ban đầu
nhietdo_data = database_data.get("nhietdo", [])

# Chuyển đổi chuỗi JSON nhietdo_data thành DataFrame pandas
df = pd.DataFrame(nhietdo_data)

# Chuyển đổi cột 'created_at' thành datetime
df['created_at'] = pd.to_datetime(df['created_at'], utc=True)

# Chuyển đổi cột 'nhietdo' thành số thực
df['nhietdo'] = df['nhietdo'].astype(float)

# Xử lý giá trị NaN trong cột 'nhietdo'
# Ví dụ: thay thế bằng giá trị trung bình
df['nhietdo'].fillna(df['nhietdo'].mean(), inplace=True)

# Chuyển đổi cột 'created_at' thành timestamp
df['timestamp'] = (df['created_at'] - datetime(1970, 1, 1, tzinfo=pd.Timestamp(df['created_at'][0]).tz)).dt.total_seconds()

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra
X_train, X_test, y_train, y_test = train_test_split(df[['timestamp']], df['nhietdo'], test_size=0.2, random_state=42)

# Xây dựng và huấn luyện mô hình
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Lấy thời điểm cuối cùng trong dữ liệu
last_timestamp = df['timestamp'].max()

# Tạo danh sách thời điểm tiếp theo, mỗi thời điểm cách nhau 1 ngày (86400 giây)
future_timestamps = [last_timestamp + i for i in range(86400, 864001, 86400)]


# Chuyển đổi các timestamp dự đoán thành datetime và sau đó thành chuỗi thời gian ISO
future_datetimes = [datetime.utcfromtimestamp(ts).isoformat() for ts in future_timestamps]

# Tạo DataFrame cho các thời điểm dự đoán
future_df = pd.DataFrame({'timestamp': future_datetimes})

# Dự đoán nhiệt độ cho các thời điểm tương lai
future_df['nhietdo'] = model.predict(np.array(future_timestamps).reshape(-1, 1))

# Chuyển đổi kết quả dự đoán thành danh sách Python
nhietdo_predictions = future_df.to_dict(orient='records')

# Cập nhật trường "dudoannhietdo" trong đối tượng dữ liệu ban đầu với dự đoán nhiệt độ
database_data['dudoannhietdo'] = nhietdo_predictions

# Lưu lại đối tượng dữ liệu với trường "dudoannhietdo" đã cập nhật thành tệp "database.json"
with open('database.json', 'w') as json_file:
    json.dump(database_data, json_file, indent=4)

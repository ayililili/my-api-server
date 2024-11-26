# 使用 Node.js 镜像
FROM node:20-alpine

# 设置容器内的工作目录为 /usr/src/app
WORKDIR /usr/src/app

# 复制 package.json 到容器的工作目录
COPY package.json ./

# 安装依赖
RUN npm install

# 复制所有文件到容器的工作目录
COPY . .

# 设置容器暴露的端口
EXPOSE 3002

# 设置启动命令
CMD ["npm", "start"]

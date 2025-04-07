# 第一阶段：构建阶段
FROM golang:1.24 AS builder
WORKDIR /app
# 先复制 go.mod 和 go.sum 文件，下载依赖
COPY go.mod go.sum ./
RUN go mod download
# 复制 src 目录下的所有代码
COPY src/ ./src
# 切换到 src 目录并编译生成静态链接的可执行文件
WORKDIR /app/src
RUN CGO_ENABLED=0 go build -o app main.go

# 第二阶段：运行阶段
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/src/app .
# 将前端资源复制到 /root/ 下
COPY index.html .
COPY script.js .
COPY style.css .
EXPOSE 8080
CMD ["./app"]


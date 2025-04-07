# Construct
FROM golang:1.24 AS builder
WORKDIR /app

# Dependency
COPY go.mod go.sum ./
RUN go mod download

# Copy src
COPY src/ ./src

# Get executable file
WORKDIR /app/src
RUN CGO_ENABLED=0 go build -o app main.go

# Run
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/src/app .

# Copy frontend
COPY index.html .
COPY script.js .
COPY style.css .
EXPOSE 8080
CMD ["./app"]


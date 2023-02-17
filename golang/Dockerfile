FROM golang:1.20.1 as builder

WORKDIR /usr/app

COPY . .
RUN go mod init full_cycle
RUN go build

FROM scratch

COPY --from=builder /usr/app/full_cycle .

CMD  [ "./full_cycle" ]
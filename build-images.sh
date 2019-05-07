#!/usr/bin/env bash
docker build -t res/musician -f docker/image-musician/Dockerfile .
docker build -t res/auditor -f docker/image-auditor/Dockerfile .
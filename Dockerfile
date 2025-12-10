# ------------------------------------------------------------------------------
# Stage 1: Builder (install dependencies)
# ------------------------------------------------------------------------------
FROM python:3.12-slim AS builder

WORKDIR /app

# Install system packages required for building Python dependencies
RUN apt-get update && apt-get install -y build-essential gcc --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install Python dependencies in the builder stage
RUN pip install --no-cache-dir -r requirements.txt

# ------------------------------------------------------------------------------
# Stage 2: Production container
# ------------------------------------------------------------------------------
FROM python:3.12-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy app files
COPY . .

ENV PORT=5000

EXPOSE 5000

# Use Gunicorn as production WSGI server
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app", "--workers", "3", "--threads", "4", "--timeout", "120"]

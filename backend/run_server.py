"""
Entry point for running the FastAPI backend.

Works both locally (defaults to port 8000) and on Railway/Render/etc.
(uses the $PORT environment variable they provide).
"""

import os
import uvicorn

if __name__ == "__main__":
    # Read port from environment (Railway/Render set this automatically).
    # Falls back to 8000 for local development.
    port = int(os.environ.get("PORT", 8000))

    # Detect environment: production hosts set their own indicators.
    # Default to development if nothing is set.
    is_production = (
        os.environ.get("RAILWAY_ENVIRONMENT") is not None
        or os.environ.get("RENDER") is not None
        or os.environ.get("ENV") == "production"
    )

    uvicorn.run(
        "main:app",
        # 0.0.0.0 = listen on all network interfaces (required for cloud hosts).
        # 127.0.0.1 only accepts connections from inside the container.
        host="0.0.0.0",
        port=port,
        # Disable auto-reload in production. Reload mode (WatchFiles)
        # is great for local dev but wastes RAM and causes flakiness in prod.
        reload=not is_production,
        # Workers: 1 is fine for hobby projects. Increase for higher traffic
        # (but watch your memory — each worker loads the full model into RAM).
        workers=1,
        # Log level: "info" is the right default. Use "debug" only when debugging.
        log_level="info",
    )

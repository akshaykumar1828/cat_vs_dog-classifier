"use client"

import { useState, useCallback, useRef } from "react"
import Image from "next/image"
import { Upload, X, Loader2, Cat, Dog, ImageIcon, AlertCircle } from "lucide-react"

// Proxy through our own API route to avoid CORS issues
const API_URL = "/api/predict"

interface PredictionResult {
  prediction?: string
  class?: string
  label?: string
  confidence?: number
  probability?: number
  [key: string]: unknown
}

export function Classifier() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, etc.)")
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB")
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const classify = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        setError("Could not reach the server. Please try again in a moment.")
      } else {
        setError(msg || "Failed to classify image. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const getPrediction = (): string => {
    if (!result) return ""
    const val = result.prediction || result.class || result.label || ""
    return String(val).toLowerCase()
  }

  const getConfidence = (): number | null => {
    if (!result) return null
    const val = result.confidence ?? result.probability
    if (val === undefined || val === null) return null
    return typeof val === "number" ? val : parseFloat(String(val))
  }

  const prediction = getPrediction()
  const confidence = getConfidence()
  const isCat = prediction.includes("cat")
  const isDog = prediction.includes("dog")

  return (
    <section id="classifier" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Upload Your Image
          </h2>
          <p className="mt-3 text-muted-foreground">
            Drop an image below and let the AI do its magic
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {/* Upload Area */}
          <div className="p-6 sm:p-8">
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
                }}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Drag and drop your image here
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or click to browse (JPG, PNG, WEBP - Max 10MB)
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0])
                  }}
                />
              </div>
            ) : (
              <div className="relative">
                <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl">
                  <Image
                    src={preview}
                    alt="Uploaded image preview"
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                </div>
                <button
                  onClick={clearFile}
                  className="absolute right-2 top-2 rounded-full bg-foreground/80 p-1.5 text-background transition-opacity hover:opacity-80"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action Bar */}
          {preview && (
            <div className="border-t border-border bg-muted/30 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                  <span className="max-w-[200px] truncate">{file?.name}</span>
                  <span className="text-xs">
                    ({((file?.size ?? 0) / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  onClick={classify}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Classify Image"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="border-t border-destructive/20 bg-destructive/5 p-6">
              <div className="flex items-center gap-3 text-sm text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="border-t border-border p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl ${
                    isCat
                      ? "bg-primary/10 text-primary"
                      : isDog
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCat ? (
                    <Cat className="h-10 w-10" />
                  ) : isDog ? (
                    <Dog className="h-10 w-10" />
                  ) : (
                    <ImageIcon className="h-10 w-10" />
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-medium text-muted-foreground">
                    Prediction Result
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold capitalize text-foreground">
                    {prediction || "Unknown"}
                  </p>
                  {confidence !== null && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Confidence</span>
                        <span className="font-semibold text-foreground">
                          {(confidence > 1 ? confidence : confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isCat ? "bg-primary" : isDog ? "bg-accent" : "bg-muted-foreground"
                          }`}
                          style={{
                            width: `${confidence > 1 ? confidence : confidence * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Raw response (collapsed) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                  View raw API response
                </summary>
                <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-xs text-muted-foreground">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Sample images */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            No image handy? Just upload any cat or dog photo from your device!
          </p>
        </div>
      </div>
    </section>
  )
}

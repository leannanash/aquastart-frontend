import { useEffect, useRef, useState } from 'react'

export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  /** Shown larger than the rest. Use on the first photo only. */
  featured?: boolean
}

/*
 * GALLERY PHOTOS
 * Replace these with real AquaStart photos. Put the files in
 * /public/images/gallery/ (or change the paths) and update the alt text and
 * caption so they describe what is actually in each photo.
 *
 * The first photo is shown larger. Suggested sizes: first photo about
 * 1200x900, the others about 800x800 (landscape or portrait is fine; images
 * are cropped to fit). Until a file exists, a neutral "Photo coming soon"
 * tile is shown instead of a broken image.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/gallery/swim-coaching.jpg',
    alt: 'Instructor guiding a young swimmer through a kicking drill at the pool edge',
    caption: 'Learning to kick with the instructor close by',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    src: '/gallery/swim-coaching2.jpg',
    alt: 'Swimmer practicing breathing with their face in the water',
    caption: 'Practicing breathing, one breath at a time',
    width: 800,
    height: 800,
  },
  {
    src: '/gallery/swim-coaching3.jpg',
    alt: 'Adult swimmer building confidence during a lesson',
    caption: 'Adults are always welcome to start from the basics',
    width: 800,
    height: 800,
  },
  {
    src: '/gallery/swim-coaching4.jpg',
    alt: 'Instructor demonstrating a stroke to a swimmer in the pool',
    caption: 'Showing the stroke, then trying it together',
    width: 800,
    height: 800,
  },
  {
    src: '/gallery/swim-coaching5.jpg',
    alt: 'Smiling swimmer after finishing a lap',
    caption: 'A proud finish after a first full lap',
    width: 800,
    height: 800,
  },
]

const ring =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const btnGhostOnDark =
  `inline-flex min-h-12 items-center justify-center rounded-sm border border-white/60 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10 ${ring} focus-visible:outline-white`

function PhotoPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[#E6F1F2] p-4 text-center text-sm text-slate-600 ${className}`}
    >
      Photo coming soon
    </div>
  )
}

type PhotoGalleryProps = {
  photos?: GalleryPhoto[]
}

export function PhotoGallery({ photos = GALLERY_PHOTOS }: PhotoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [failed, setFailed] = useState<Record<string, boolean>>({})

  const total = photos.length
  const isOpen = activeIndex !== null
  const active = activeIndex === null ? null : photos[activeIndex]

  const markFailed = (src: string) =>
    setFailed((prev) => ({ ...prev, [src]: true }))

  const openAt = (index: number) => {
    setActiveIndex(index)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  const step = (direction: 1 | -1) =>
    setActiveIndex((index) =>
      index === null ? index : (index + direction + total) % total,
    )

  // Keep the page from scrolling behind the open lightbox.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {photos.map((photo, index) => (
          <li
            key={photo.src}
            className={`relative ${
              photo.featured
                ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto'
                : 'aspect-square'
            }`}
          >
            {failed[photo.src] ? (
              <PhotoPlaceholder className="absolute inset-0" />
            ) : (
              <button
                type="button"
                onClick={() => openAt(index)}
                aria-haspopup="dialog"
                className={`group absolute inset-0 block overflow-hidden ${ring} focus-visible:outline-cyan-700`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  onError={() => markFailed(photo.src)}
                  className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-[#073B4C]/0 transition-colors duration-300 group-hover:bg-[#073B4C]/10"
                  aria-hidden="true"
                />
                <span className="sr-only"> (opens larger view)</span>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* LIGHTBOX (native dialog: focus trap, Esc to close, focus returns to the photo) */}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') step(-1)
          if (event.key === 'ArrowRight') step(1)
        }}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-[#073B4C]/95"
      >
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="flex w-full max-w-5xl justify-end">
            <button type="button" onClick={close} className={btnGhostOnDark}>
              Close
            </button>
          </div>

          {active && (
            <figure className="flex w-full max-w-5xl flex-col items-center gap-3">
              {failed[active.src] ? (
                <PhotoPlaceholder className="aspect-[4/3] w-full max-w-xl" />
              ) : (
                <img
                  src={active.src}
                  alt={active.alt}
                  onError={() => markFailed(active.src)}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              )}
              <figcaption className="text-center text-sm leading-6 text-white/85">
                {active.caption}
              </figcaption>
            </figure>
          )}

          <div className="flex w-full max-w-5xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              className={btnGhostOnDark}
            >
              Previous<span className="sr-only"> photo</span>
            </button>

            <p className="text-sm text-white/85" aria-live="polite">
              {activeIndex === null ? '' : `${activeIndex + 1} of ${total}`}
            </p>

            <button
              type="button"
              onClick={() => step(1)}
              className={btnGhostOnDark}
            >
              Next<span className="sr-only"> photo</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
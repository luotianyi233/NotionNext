/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { siteConfig } from '@/lib/config'

export const getYouTubeEmbedUrl = (url) => {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)
    const videoId =
      parsedUrl.hostname.includes('youtu.be')
        ? parsedUrl.pathname.replace('/', '')
        : parsedUrl.searchParams.get('v')

    if (!videoId) return ''

    const baseUrl = 'https://www.youtube-nocookie.com/embed/'
    const query = parsedUrl.searchParams.toString()

    return `${baseUrl}${videoId}${query ? `?${query}` : ''}`
  } catch (error) {
    return ''
  }
}

/**
 * 首页的生涯模块
 */
export const Career = () => {
  const Careers = siteConfig('PROXIO_CAREERS')
  return (
    <>
      {/* <!-- ====== About Section Start --> */}
      <section
        id='about'
        className='bg-transparent pb-8 pt-20 dark:bg-black lg:pb-[70px] lg:pt-[120px]'>
        <div className='container'>
          <div className='wow fadeInUp' data-wow-delay='.2s'>
            {/* 左侧的文字说明板块 */}
            <div className='w-full px-4 lg:w-1/2'>
              <div className='mb-12 max-w-[540px] lg:mb-0'>
                <span className='px-3 py-0.5 rounded-2xl dark:bg-dark-1 border border-gray-200 dark:border-[#333333] dark:text-white'>
                  {siteConfig('PROXIO_CAREER_TITLE')}
                </span>
                <h2
                  className='mb-10 text-3xl font-semibold leading-relaxed dark:text-dark-6'
                >{siteConfig('PROXIO_CAREER_TEXT')}</h2>
              </div>
            </div>

            <div className='-mx-4 flex flex-wrap items-center px-4'>
              {Careers?.map((item, index) => {
                return <CareerItem key={index} {...item} />
              })}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ====== About Section End --> */}
    </>
  )
}

// 生涯内容
const CareerItem = ({ title, bio, text, videoUrl }) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <div className='w-full border-b mb-6 border-gray-200 dark:border-[#333333] px-4 flex flex-col gap-4 wow fadeInUp lg:flex-row lg:justify-between'>
      <div className='flex flex-col items-start w-full lg:w-5/12' data-wow-delay='.1s'>
        <h4 className='mb-3 text-xl text-dark dark:text-white'>
          <span className='font-bold mr-4'>{title}</span>
          <span className='text-sm'>{bio}</span>
        </h4>
      </div>

      <div className='w-full lg:w-7/12'>
        <p className='mb-6 whitespace-pre-line text-body-color dark:text-dark-6 lg:mb-9'>
          {text}
        </p>

        {embedUrl && (
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-[#333333] dark:bg-[#111827]'>
            <div className='relative aspect-video w-full'>
              <iframe
                title={`${title} video`}
                src={embedUrl}
                className='absolute inset-0 h-full w-full'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
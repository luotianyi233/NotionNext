import { render, screen } from '@testing-library/react'
import { Career, getYouTubeEmbedUrl } from '@/themes/proxio/components/Career'

jest.mock('@/lib/config', () => ({
  siteConfig: (key) => {
    const config = {
      PROXIO_CAREER_TITLE: 'Career',
      PROXIO_CAREER_TEXT: 'My journey',
      PROXIO_CAREERS: [
        {
          title: 'The Hidden Ones',
          bio: '2024',
          text: 'Worked on a puzzle game.',
          videoUrl: 'https://youtu.be/umyn1D0EzSg?si=9aK2fgLblw-RrC-Q'
        }
      ]
    }

    return config[key]
  }
}))

describe('Career video embeds', () => {
  it('converts a shared YouTube link into an embeddable URL', () => {
    expect(
      getYouTubeEmbedUrl('https://youtu.be/umyn1D0EzSg?si=9aK2fgLblw-RrC-Q')
    ).toBe('https://www.youtube-nocookie.com/embed/umyn1D0EzSg?si=9aK2fgLblw-RrC-Q')
  })

  it('renders a video iframe when a career item has a youtube url', () => {
    render(<Career />)

    const iframe = screen.getByTitle('The Hidden Ones video')
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/umyn1D0EzSg?si=9aK2fgLblw-RrC-Q'
    )
  })
})

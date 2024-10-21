export const linkify = (text: string) => {
  const urlPattern =
    /(\b(https?:\/\/|www\.|ftp:\/\/|file:\/\/)?[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.[A-Z]{2,}[-A-Z0-9+&@#\/%=~_|]*)/gi;

  return text.split(urlPattern).map((part, index) => {
    if (urlPattern.test(part)) {
      const href =
        part.startsWith('http') || part.startsWith('ftp')
          ? part
          : `https://${part}`;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export function adminEditRoute(pageId: string) {
  return `/admin/payment-pages/${pageId}/edit`
}

export function publicPayRoute(slug: string) {
  return `/pay/${slug}`
}

export function publicStatusRoute(slug: string, status: 'success' | 'failure' | 'disabled') {
  return `/pay/${slug}/${status}`
}

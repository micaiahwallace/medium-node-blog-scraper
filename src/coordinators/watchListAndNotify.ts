export interface ListWatchNotifierOptions<Item extends {}> {
  fetchOldItems: () => Promise<Item[]>
  fetchNewItems: () => Promise<Item[]>
  getNotifiableItems: (previous: Item[], next: Item[]) => Item[]
  notify: (item: Item) => Promise<void>
  log: (...messages: any[]) => void
}

/**
 * Watch a list of items from a remote source and notify based on the rules specified
 */
export const watchListAndNotify = async <T>({
  fetchOldItems,
  fetchNewItems,
  getNotifiableItems,
  notify,
  log,
}: ListWatchNotifierOptions<T>): Promise<void> => {
  const old_items_promise = fetchOldItems()
  const new_items_promise = fetchNewItems()
  const [old_items, new_items] = await Promise.allSettled([
    old_items_promise,
    new_items_promise,
  ])

  if (old_items.status === 'rejected') {
    log('retrieving old items encountered an error', old_items.reason)
    return
  }

  if (new_items.status === 'rejected') {
    log('retrieving new items encountered an error', new_items.reason)
    return
  }

  const items_to_notify = getNotifiableItems(old_items.value, new_items.value)
  await Promise.allSettled(items_to_notify.map((item) => notify(item)))
}

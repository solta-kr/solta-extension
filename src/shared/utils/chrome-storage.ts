export async function getStorageValue<T>(key: string): Promise<T | null> {
	const data = await chrome.storage.local.get([key]);
	return (data[key] as T) ?? null;
}

export async function setStorageValue<T>(
	key: string,
	value: T,
): Promise<void> {
	await chrome.storage.local.set({ [key]: value });
}

export async function removeStorageValues(keys: string[]): Promise<void> {
	await chrome.storage.local.remove(keys);
}

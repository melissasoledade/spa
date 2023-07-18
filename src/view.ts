namespace View {
    // import ToDoItem = Model.ToDoItem

    interface View {
        render(args: unknown): void
    }

    abstract class TabView implements View {
        abstract render(args: unknown): void

        
    }

    export function buildItemList(items: Model.ToDoItem[], container: HTMLElement) {
        for (const item of items) {
            const template = document.getElementById('list-item-template') as HTMLTemplateElement
            const clone = template.content.cloneNode(true) as DocumentFragment

            const listItem = clone.querySelector('.list-group-item')
            const description = clone.querySelector('.list-item-desc')
            const badgeContainer = clone.querySelector('.badge-container')
            const deadline = clone.querySelector('.list-item-deadline')

            listItem?.querySelector('.form-check-input')
                ?.setAttribute('data-id', item.id.toString())

            // TODO: identify the checkboxes

            if (description) {
                description.textContent = item.description
            }

            if (deadline?.textContent) {
                const date = Date.parse(item?.deadline || '')
                deadline.textContent = (date)
                ? new Date(date).toUTCString().slice(0, 16)
                : ''
            }

            const badgeTemplate = clone.querySelector('.list-item-badge')

            if (item.tags && item.tags.length > 0) {
                for (const tag of item.tags) {
                    const newBadge = badgeTemplate?.cloneNode as unknown as Element

                    newBadge.textContent = tag
                    badgeContainer?.appendChild(newBadge)
                }
            }

            if (badgeTemplate) {
                badgeTemplate?.removeChild(badgeTemplate)
            }

            if (listItem) {
                container.appendChild(listItem)
            }
        }
    }
}

async function main() {
    const dao = new Model.ToDoItemDao()

    const items = await dao.listAll()
    const container = document.getElementById('newest-content')

    if (container) {
        View.buildItemList(items, container)
    }   

    // console.log(items)
}

main().then()
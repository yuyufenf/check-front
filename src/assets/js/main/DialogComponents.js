import { createApp } from 'vue'
import Dialog from "@/components/main/DialogComponents.vue";

export default({ title, content, onCancel, onConfirm }) => {
    const mountNode = document.createElement("view");
    const instance = createApp(Dialog, {
        title: title,
        modelValue: true,
        contentBody: content,
        onCancel: () => {
            instance.unmount(mountNode);
            document.body.removeChild(mountNode);
            onCancel && onCancel();
        },
        onConfirm: async () =>{
            if (onConfirm){
                await onConfirm();
            }
            instance.unmount(mountNode);
            document.body.removeChild(mountNode);
        }
    })

    document.body.appendChild(mountNode)
    instance.mountNode = mountNode;

    return instance;
}
<template>
    <h1>請求先</h1>
    <inputName></inputName>
    <br/>
    <label>請求書送付先住所</label>
    <inputAddress></inputAddress>
    <br/>
    <button type="button" id="back-button" @click="() => $router.push({path: './'})">戻る</button>
    <button type="button" id="submit-button">登録</button>
</template>

<script>
    import inputName from '../components/InputName.vue'
    import inputAddress from '../components/InputAddress.vue'
    export default {
        components: {
            inputName,
            inputAddress
        }
    }
</script>

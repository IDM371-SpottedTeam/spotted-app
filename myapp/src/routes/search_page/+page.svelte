<script lang="ts">
     let image_preview = $state('');

     function upload_preview (e: Event) {
          const img = (e.target as HTMLInputElement)?.files?.[0];
          if (!img) return;
          image_preview = URL.createObjectURL(img);
     };

</script>

<div class="upload">
     
     <form method="POST" enctype="multipart/form-data" id="image_upload">
          <input type="file" name="uploaded_image" accept="image/*" id="selected_image" onchange={upload_preview} required />
               {#if image_preview}
               <img src={image_preview} alt=""/>
               {/if}

          <button type="submit" formaction="?/upload" disabled={!image_preview}>Upload</button>
     </form>

</div>



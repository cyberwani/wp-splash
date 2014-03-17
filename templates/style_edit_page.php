<?php
/**
 * 
 */
?>
<?php if( !empty( $data[ 'msg' ] ) ) : ?>
  <div class="updated"><p><strong><?php echo $data[ 'msg' ]; ?></strong></p></div>
<?php endif; ?>
<div class="wrap">
  <h2><?php _e( 'StyleSheet Editor', get_wp_amd( 'text_domain' ) ); ?></h2>
  <form action="themes.php?page=amd-page-style" method="post" id="global-stylesheet-form">
    <?php wp_nonce_field( 'update_amd_style', 'update_amd_style_nonce' ); ?>
    <div class="metabox-holder has-right-sidebar">

      <div class="inner-sidebar">

        <div class="postbox">
          <h3><span><?php _e( 'Publish', get_wp_amd( 'text_domain' ) ); ?></span></h3>
          <div class="inside">
            <input class="button-primary" type="submit" name="publish" value="<?php _e( 'Save Stylesheet' ); ?>"/>
          </div>
        </div>
        <div class="postbox">
          <h3><span><?php _e( 'Dependency', get_wp_amd( 'text_domain' ) ); ?></span></h3>
          <div class="inside">
            <?php foreach( (array)$this->get( 'dependencies' ) as $dep => $dep_array ): ?>
              <label><input type="checkbox" name="dependency[]" value="<?php echo $dep; ?>" <?php checked( in_array( $dep, $dependency ), true ); ?> /><a href="<?php echo $dep_array[ 'infourl' ]; ?>"> <?php echo $dep_array[ 'name' ]; ?> </a></label>
              <br/>
            <?php endforeach; ?>
          </div>
        </div>
        <!-- ... more boxes ... -->
        <?php do_meta_boxes( 'amd_style', 'normal', $data ); ?>

      </div> <!-- .inner-sidebar -->

      <div id="post-body">
        <div id="post-body-content">
          <div id="global-editor-shell">
          <textarea style="width:100%; height: 360px; resize: none;" id="global-stylesheet" class="wp-editor-area" name="global-stylesheet"><?php echo $data[ 'post_content' ]; ?></textarea>
          </div>
        </div> <!-- #post-body-content -->
      </div> <!-- #post-body -->

    </div> <!-- .metabox-holder -->
  </form>
</div> <!-- .wrap -->
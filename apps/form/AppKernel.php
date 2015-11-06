<?php
use Tactics\Bundle\Sf2BridgeBundle\Sf2BridgeContext;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Sf2BridgeContext
{  
  /**
   * Retrieve the singleton instance of this class.
   *
   * @return AppKernel A AppKernel implementation instance.
   */
  public static function getInstance()
  {
    if (!isset(self::$instance))
    {
      $class = __CLASS__;
      self::$instance = new $class();
      self::$instance->initialize();
    }

    return self::$instance;
  }
  
  /**
   * Register the app bundle here
   *    
   * @return array
   */
  public function registerBundles()
  {
    $sf2BridgeBundles = parent::registerBundles();
    
    return array_merge($sf2BridgeBundles, array(
      new \Symfony\Bundle\TwigBundle\TwigBundle()
    ));
  }
  
  /**
   * Loading the container configuration
   * 
   * @param type $container
   */
  public function registerContainerConfiguration(LoaderInterface $loader)
  {   
    $loader->load(\sfConfig::get('sf_app_dir').'/config/container.yml');    
  }  
}
